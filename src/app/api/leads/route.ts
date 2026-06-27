import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadFormSchema } from "@/lib/validations";
import { leadFormLimiter } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/get-client-ip";
import { sendLeadNotificationEmail, sendLeadConfirmationEmail } from "@/lib/email";
import { sendLeadWhatsAppNotification } from "@/lib/whatsapp";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    const { success: withinLimit } = await leadFormLimiter.limit(`lead:${ip}`);
    if (!withinLimit) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = leadFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please check the form for errors.",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Honeypot check — if filled, silently pretend success (don't tip off bots).
    if (parsed.data.website) {
      return NextResponse.json({ success: true });
    }

    const { fullName, phone, email, pincode, monthlyBill, propertyType, message } =
      parsed.data;

    const userAgent = request.headers.get("user-agent") ?? undefined;

    // 1. Always persist the lead first — notifications are best-effort and
    //    must never cause us to lose a real lead if they fail.
    const lead = await prisma.lead.create({
      data: {
        fullName,
        phone,
        email: email || null,
        pincode,
        monthlyBill: monthlyBill ?? null,
        propertyType,
        message: message || null,
        source: "SCHEDULE_VISIT_MODAL",
        ipAddress: ip,
        userAgent,
      },
    });

    // 2. Fire notifications in parallel; failures are logged but don't fail the request.
    const [emailSent, whatsappSent] = await Promise.all([
      sendLeadNotificationEmail({
        fullName,
        phone,
        email,
        pincode,
        monthlyBill,
        propertyType,
        source: "Schedule a Free Visit",
        message,
      }),
      sendLeadWhatsAppNotification({ fullName, phone, pincode, monthlyBill }),
    ]);

    if (email) {
      // Confirmation to the customer — fire and forget, don't await blocking the response further.
      void sendLeadConfirmationEmail(email, fullName);
    }

    if (emailSent || whatsappSent) {
      await prisma.lead.update({
        where: { id: lead.id },
        data: { emailSent, whatsappSent },
      });
    }

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (error) {
    console.error("[api/leads] Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please call us directly at +91 7007629710." },
      { status: 500 }
    );
  }
}
