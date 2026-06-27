import { LineChart, Eye, Trophy, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const featureIcons = [LineChart, Eye, Trophy, ShieldCheck];

const weeklyBars = [
  { day: "M", value: 55 },
  { day: "T", value: 48 },
  { day: "W", value: 70 },
  { day: "T", value: 40 },
  { day: "F", value: 78 },
  { day: "S", value: 62 },
  { day: "S", value: 88 },
];

export function MonitoringAppSection() {
  const { monitoringApp } = siteConfig;

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-leaf-600">
              {monitoringApp.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
              {monitoringApp.headline}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
              {monitoringApp.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {monitoringApp.features.map((feature, i) => {
                const Icon = featureIcons[i];
                return (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-xl border border-forest-100 bg-sand px-4 py-3"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-leaf-100 text-leaf-700">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-ink">{feature}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="dark">
                <Smartphone className="h-4 w-4" /> Get on Play Store
              </Button>
              <Button variant="outline">
                <Smartphone className="h-4 w-4" /> Get on App Store
              </Button>
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              The monitoring app reflects your real installed system once your
              installation is complete and live monitoring is connected.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[280px]">
            <div className="rounded-[2.5rem] border-[10px] border-forest-800 bg-leaf-50 p-5 shadow-lift">
              <p className="text-[10px] font-bold uppercase tracking-wide text-ink-muted">
                Today&apos;s Generation
              </p>
              <p className="mt-1 font-display text-3xl font-extrabold text-leaf-700">
                28.4 <span className="text-base font-semibold">kWh</span>
              </p>
              <p className="mt-0.5 text-xs font-semibold text-leaf-600">
                ▲ 12% vs yesterday
              </p>

              <div className="mt-4 rounded-2xl bg-white p-3 shadow-card">
                <p className="text-[10px] font-bold uppercase tracking-wide text-ink-muted">
                  This Month
                </p>
                <p className="font-display text-xl font-bold text-ink">₹12,450 saved</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-forest-100">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-leaf-500 to-amber-400" />
                </div>
              </div>

              <div className="mt-4 flex h-28 items-end justify-between gap-1.5">
                {weeklyBars.map((bar, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-leaf-600 to-amber-400"
                      style={{ height: `${bar.value}%` }}
                    />
                    <span className="text-[9px] text-ink-muted">{bar.day}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-forest-800 p-3 text-white">
                <p className="text-[10px] font-bold uppercase tracking-wide text-leaf-300">
                  CO₂ Avoided
                </p>
                <p className="text-sm font-bold">142 kg this month 🌱</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
