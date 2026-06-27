import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";
import { registerLimiter } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/get-client-ip";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    const { success: withinLimit } = await registerLimiter.limit(`register:${ip}`);
    if (!withinLimit) {
      return NextResponse.json(
        { error: "Too many registration attempts. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form for errors.", fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, password } = parsed.data;

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    });

    if (existingUser) {
      // Deliberately vague to avoid confirming which field exists (email enumeration).
      return NextResponse.json(
        { error: "An account with these details already exists. Try logging in instead." },
        { status: 409 }
      );
    }

    // bcrypt cost factor 12 — strong default for 2026 hardware without being
    // so slow it causes timeouts on serverless functions.
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
        role: "CUSTOMER",
      },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    console.error("[api/auth/register] Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
