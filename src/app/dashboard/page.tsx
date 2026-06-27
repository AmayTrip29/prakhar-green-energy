"use client";

import * as React from "react";
import { Sun, Wallet, Leaf as LeafIcon, AlertCircle, Loader2, PhoneCall } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

interface DashboardData {
  connected: boolean;
  reason?: "NO_SYSTEM_REGISTERED" | "MONITORING_NOT_CONNECTED";
  message?: string;
  system?: {
    capacityKw: number;
    installationDate: string | null;
    inverterBrand: string | null;
  };
  today?: { kwhGenerated: number; date: string } | null;
  thisMonth?: { rupeesSaved: number; co2AvoidedKg: number };
  weeklyChart?: { date: string; kwh: number }[];
}

export default function CustomerDashboardPage() {
  const [data, setData] = React.useState<DashboardData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/dashboard")
      .then(async (res) => {
        if (res.status === 401) {
          window.location.href = "/login";
          return null;
        }
        return res.json();
      })
      .then((json) => {
        if (json) setData(json);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-leaf-600" />
      </div>
    );
  }

  if (!data || !data.connected) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
          <AlertCircle className="h-6 w-6 text-amber-700" />
        </div>
        <h2 className="mt-4 font-display text-lg font-bold text-forest-800">
          Monitoring not connected yet
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {data?.message ??
            "We couldn't load your monitoring data. Please try again shortly."}
        </p>
        <a
          href={`tel:${siteConfig.phone}`}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-forest-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-700"
        >
          <PhoneCall className="h-4 w-4" /> Call {siteConfig.phoneDisplay}
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-ink">Your Solar System</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-forest-100 bg-white p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-leaf-100">
            <Sun className="h-4 w-4 text-leaf-700" />
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Today&apos;s Generation
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-ink">
            {data.today ? `${data.today.kwhGenerated} kWh` : "No data yet"}
          </p>
        </div>

        <div className="rounded-2xl border border-forest-100 bg-white p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100">
            <Wallet className="h-4 w-4 text-amber-700" />
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            This Month Saved
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-ink">
            ₹{data.thisMonth?.rupeesSaved.toLocaleString("en-IN") ?? 0}
          </p>
        </div>

        <div className="rounded-2xl border border-forest-100 bg-white p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-100">
            <LeafIcon className="h-4 w-4 text-forest-700" />
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            CO₂ Avoided
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-ink">
            {data.thisMonth?.co2AvoidedKg ?? 0} kg
          </p>
        </div>
      </div>

      {data.system && (
        <div className="rounded-2xl border border-forest-100 bg-white p-5">
          <h2 className="font-display text-base font-bold text-ink">System Details</h2>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-ink-muted">Capacity</dt>
              <dd className="font-semibold text-ink">{data.system.capacityKw} kW</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Inverter</dt>
              <dd className="font-semibold text-ink">{data.system.inverterBrand ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Installed On</dt>
              <dd className="font-semibold text-ink">
                {data.system.installationDate
                  ? new Date(data.system.installationDate).toLocaleDateString("en-IN")
                  : "—"}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
