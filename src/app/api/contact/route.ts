import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { leadFormLimiter } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/get-client-ip";
import { prisma } from "@/lib/prisma";
import { sendLeadNotificationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const { success: withinLimit } = await leadFormLimiter.limit(`contact:${ip}`);
    if (!withinLimit) {
      return NextResponse.json(
        { error: "Too many messages sent. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form for errors.", fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ success: true });
    }

    const { fullName, phone, email, subject, message } = parsed.data;

    // Contact messages are stored as Leads with source=CONTACT_PAGE so they
    // surface in the same admin pipeline as other inquiries.
    await prisma.lead.create({
      data: {
        fullName,
        phone,
        email: email || null,
        pincode: null,
        message: `[${subject}] ${message}`,
        source: "CONTACT_PAGE",
        ipAddress: ip,
      },
    });

    await sendLeadNotificationEmail({
      fullName,
      phone,
      email,
      pincode: "Not provided (contact form)",
      monthlyBill: null,
      propertyType: "N/A",
      source: `Contact Page — ${subject}`,
      message,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("[api/contact] Unexpected error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
