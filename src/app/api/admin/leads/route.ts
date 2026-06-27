import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/require-admin";
import { leadStatusUpdateSchema } from "@/lib/validations";

const VALID_STATUSES = [
  "NEW",
  "CONTACTED",
  "SITE_VISIT_SCHEDULED",
  "SITE_VISIT_DONE",
  "PROPOSAL_SENT",
  "WON",
  "LOST",
] as const;
type LeadStatusValue = (typeof VALID_STATUSES)[number];

function isValidStatus(value: string): value is LeadStatusValue {
  return (VALID_STATUSES as readonly string[]).includes(value);
}

export async function GET(request: NextRequest) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get("status");
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const pageSize = 25;

  if (statusParam && !isValidStatus(statusParam)) {
    return NextResponse.json({ error: "Invalid status filter." }, { status: 400 });
  }

  const where: Prisma.LeadWhereInput = statusParam ? { status: statusParam } : {};

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.lead.count({ where }),
  ]);

  return NextResponse.json({
    leads,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}

export async function PATCH(request: NextRequest) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const parsed = leadStatusUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input.", fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { leadId, status, notes } = parsed.data;

    const updated = await prisma.lead.update({
      where: { id: leadId },
      data: { status, ...(notes !== undefined ? { notes } : {}) },
    });

    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    console.error("[api/admin/leads PATCH] Unexpected error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
