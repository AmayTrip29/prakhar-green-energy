import { Home, Sun, FileText, Leaf } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const stats = [
  { icon: Home, value: siteConfig.stats.homesSolarized, label: "Homes Solarized" },
  { icon: Sun, value: siteConfig.stats.powerInstalledMw, label: "Power Installed" },
  { icon: FileText, value: siteConfig.stats.subsidyDeliveredCr, label: "Subsidy Delivered (₹)" },
  { icon: Leaf, value: siteConfig.stats.co2AvoidedTons, label: "Tons CO₂ Avoided" },
];

export function StatsSection() {
  return (
    <section className="bg-forest-800 bg-grid-pattern bg-grid py-16">
      <div className="container">
        <div className="mx-auto max-w-xl text-center text-white">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            Powering Homes Across India
          </h2>
          <p className="mt-3 text-sm text-forest-100">
            Present in {siteConfig.stats.citiesCount} cities across {siteConfig.stats.statesCount}{" "}
            states, and growing every day.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/15">
                <stat.icon className="h-6 w-6 text-amber-400" />
              </div>
              <p className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-forest-100 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
