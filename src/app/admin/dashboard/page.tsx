import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Users, TrendingUp, CalendarCheck, FileText } from "lucide-react";

export default async function AdminOverviewPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
    redirect("/admin/login");
  }

  const [totalLeads, newLeadsThisWeek, scheduledVisits, publishedPosts] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
    prisma.lead.count({ where: { status: "SITE_VISIT_SCHEDULED" } }),
    prisma.blogPost.count({ where: { published: true } }),
  ]);

  const cards = [
    { label: "Total Leads", value: totalLeads, icon: Users },
    { label: "New This Week", value: newLeadsThisWeek, icon: TrendingUp },
    { label: "Visits Scheduled", value: scheduledVisits, icon: CalendarCheck },
    { label: "Published Posts", value: publishedPosts, icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-ink">Dashboard Overview</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-forest-100 bg-white p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-leaf-100">
              <card.icon className="h-4 w-4 text-leaf-700" />
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
              {card.label}
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-ink">{card.value}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-ink-muted">
        Use the <strong>Leads</strong> tab to manage incoming inquiries, or{" "}
        <strong>Blog Posts</strong> to publish new content.
      </p>
    </div>
  );
}
