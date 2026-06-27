import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Returns the logged-in customer's solar system + recent generation data.
 *
 * If the customer has no SolarSystem record yet, or monitoringConnected is
 * false, we return a clear `connected: false` flag rather than inventing
 * numbers. The dashboard UI must check this flag and show an honest
 * "Connect your monitoring device" state. See docs/MONITORING_INTEGRATION.md
 * for wiring up a real inverter API (Growatt/Solis/Huawei FusionSolar).
 */
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const solarSystem = await prisma.solarSystem.findUnique({
    where: { userId: session.user.id },
    include: {
      generationReadings: {
        orderBy: { date: "desc" },
        take: 30,
      },
      referrals: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!solarSystem) {
    return NextResponse.json({
      connected: false,
      reason: "NO_SYSTEM_REGISTERED",
      message:
        "No solar system is linked to your account yet. Once your installation is complete, our team will register your system here.",
    });
  }

  if (!solarSystem.monitoringConnected) {
    return NextResponse.json({
      connected: false,
      reason: "MONITORING_NOT_CONNECTED",
      message:
        "Your solar system is registered, but live monitoring isn't connected yet. Our technician will complete this during your installation visit.",
      system: {
        capacityKw: solarSystem.capacityKw,
        installationDate: solarSystem.installationDate,
        inverterBrand: solarSystem.inverterBrand,
      },
    });
  }

  const readings = solarSystem.generationReadings;
  const todayReading = readings[0] ?? null;
  const thisMonthTotal = readings.reduce((sum, r) => sum + r.rupeesSaved, 0);
  const co2ThisMonth = readings.reduce((sum, r) => sum + r.co2AvoidedKg, 0);

  return NextResponse.json({
    connected: true,
    system: {
      capacityKw: solarSystem.capacityKw,
      installationDate: solarSystem.installationDate,
      inverterBrand: solarSystem.inverterBrand,
    },
    today: todayReading
      ? {
          kwhGenerated: todayReading.kwhGenerated,
          date: todayReading.date,
        }
      : null,
    thisMonth: {
      rupeesSaved: Math.round(thisMonthTotal),
      co2AvoidedKg: Math.round(co2ThisMonth),
    },
    weeklyChart: readings
      .slice(0, 7)
      .reverse()
      .map((r) => ({ date: r.date, kwh: r.kwhGenerated })),
    referrals: solarSystem.referrals,
  });
}
