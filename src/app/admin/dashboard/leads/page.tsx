"use client";

import * as React from "react";
import { Loader2, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

interface Lead {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  pincode: string | null;
  monthlyBill: number | null;
  propertyType: string;
  status: string;
  source: string;
  message: string | null;
  createdAt: string;
}

const STATUS_OPTIONS = [
  "NEW",
  "CONTACTED",
  "SITE_VISIT_SCHEDULED",
  "SITE_VISIT_DONE",
  "PROPOSAL_SENT",
  "WON",
  "LOST",
];

const statusColors: Record<string, string> = {
  NEW: "bg-amber-100 text-amber-800",
  CONTACTED: "bg-blue-100 text-blue-800",
  SITE_VISIT_SCHEDULED: "bg-purple-100 text-purple-800",
  SITE_VISIT_DONE: "bg-indigo-100 text-indigo-800",
  PROPOSAL_SENT: "bg-cyan-100 text-cyan-800",
  WON: "bg-leaf-100 text-leaf-800",
  LOST: "bg-red-100 text-red-800",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);

  const fetchLeads = React.useCallback(() => {
    setLoading(true);
    fetch("/api/admin/leads")
      .then(async (res) => {
        if (res.status === 403) {
          window.location.href = "/admin/login";
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setLeads(data.leads ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  async function updateStatus(leadId: string, status: string) {
    setUpdatingId(leadId);
    try {
      const response = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, status }),
      });
      if (!response.ok) {
        const data = await response.json();
        toast({ title: "Update failed", description: data.error, variant: "destructive" });
        return;
      }
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status } : l)));
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">Leads</h1>
        <p className="text-sm text-ink-muted">{leads.length} total</p>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-leaf-600" />
        </div>
      ) : leads.length === 0 ? (
        <p className="rounded-2xl border border-forest-100 bg-white p-8 text-center text-ink-muted">
          No leads yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-forest-100 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-forest-100 bg-sand text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Pincode</th>
                <th className="px-4 py-3">Bill</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-50">
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-4 py-3 font-medium text-ink">{lead.fullName}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center gap-1.5 text-leaf-700 hover:underline"
                      >
                        <Phone className="h-3 w-3" /> {lead.phone}
                      </a>
                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-1.5 text-ink-muted hover:underline"
                        >
                          <Mail className="h-3 w-3" /> {lead.email}
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{lead.pincode ?? "—"}</td>
                  <td className="px-4 py-3 text-ink-muted">
                    {lead.monthlyBill ? `₹${lead.monthlyBill}` : "—"}
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{lead.source.replace(/_/g, " ")}</td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      disabled={updatingId === lead.id}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className={cn(
                        "rounded-full border-none px-2.5 py-1 text-xs font-semibold",
                        statusColors[lead.status]
                      )}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-ink-muted">
                    {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
