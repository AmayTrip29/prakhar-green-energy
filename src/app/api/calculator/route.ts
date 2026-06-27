import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculatorFormSchema } from "@/lib/validations";
import { calculatorLimiter } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/get-client-ip";
import { calculateSolarSavings } from "@/lib/calculator";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    const { success: withinLimit } = await calculatorLimiter.limit(`calc:${ip}`);
    if (!withinLimit) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down and try again shortly." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = calculatorFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check your inputs.", fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const result = calculateSolarSavings({
      pincode: parsed.data.pincode,
      monthlyBillRupees: parsed.data.monthlyBill,
    });

    await prisma.calculatorSubmission.create({
      data: {
        pincode: parsed.data.pincode,
        monthlyBill: parsed.data.monthlyBill,
        estimatedSizeKw: result.recommendedSystemSizeKw,
        estimatedSubsidy: result.estimatedSubsidyRupees,
        estimatedSavingsPct: result.estimatedSavingsPct,
        estimatedPaybackYrs: result.estimatedPaybackYears,
        ipAddress: ip,
      },
    });

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    console.error("[api/calculator] Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
