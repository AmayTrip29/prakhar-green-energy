import type { Metadata } from "next";
import { Home, Sun, FileText, Leaf } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { PressSection } from "@/components/marketing/sections/press-section";

export const metadata: Metadata = {
  title: "About Us",
  description: siteConfig.description,
};

const stats = [
  { icon: Home, value: siteConfig.stats.homesSolarized, label: "Homes Solarized" },
  { icon: Sun, value: siteConfig.stats.powerInstalledMw, label: "Power Installed" },
  { icon: FileText, value: siteConfig.stats.subsidyDeliveredCr, label: "Subsidy Delivered (₹)" },
  { icon: Leaf, value: siteConfig.stats.co2AvoidedTons, label: "Tons CO₂ Avoided" },
];

export default function AboutPage() {
  return (
    <>
      <section className="section-padding bg-gradient-to-b from-leaf-50/60 to-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
              About Prakhar Green Energy Solutions
            </h1>
            <p className="mt-4 text-lg font-medium text-leaf-700">
              &ldquo;{siteConfig.tagline}&rdquo;
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {siteConfig.description}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-100">
                  <stat.icon className="h-6 w-6 text-leaf-700" />
                </div>
                <p className="mt-3 font-display text-2xl font-extrabold text-ink">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-ink-muted sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-ink">Our Mission</h2>
            <p className="mt-3 text-ink-muted leading-relaxed">
              We are committed to driving the Har Ghar Solar mission, one rooftop at a
              time — making clean, affordable solar energy accessible to every home,
              housing society, and business across India, without the usual hassle of
              navigating subsidies, paperwork, or unreliable contractors.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-ink">
              Why We&apos;re Different
            </h2>
            <p className="mt-3 text-ink-muted leading-relaxed">
              Unlike most solar installers in India, we don&apos;t outsource installation
              to third-party contractors. Every system is installed by our in-house
              technicians, backed by our PrakharShield™ savings guarantee — India&apos;s
              only money-back promise on solar generation.
            </p>
          </div>
        </div>
      </section>

      <PressSection />
    </>
  );
}
