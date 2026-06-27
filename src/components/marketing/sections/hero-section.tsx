import { Home, Zap, BatteryFull, Repeat, Building2, Phone, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScheduleVisitModal } from "@/components/marketing/schedule-visit-modal";
import { siteConfig } from "@/lib/site-config";

const offeringIcons = {
  Home,
  Zap,
  BatteryFull,
  Repeat,
  Building2,
} as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-leaf-50/40 to-white">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" aria-hidden="true" />
      <div className="container relative py-12 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-leaf-200 bg-white px-4 py-1.5 text-xs font-semibold text-leaf-700 shadow-card">
              <span className="h-1.5 w-1.5 rounded-full bg-leaf-500" />
              Lucknow&apos;s Trusted Rooftop Solar Brand
            </span>

            <h1 className="mt-5 text-balance font-display text-4xl font-extrabold leading-[1.1] text-ink sm:text-5xl">
              The Future is Solar.
              <br />
              <span className="text-leaf-600">Bring it Home Today.</span>
            </h1>

            <p className="mt-5 max-w-lg text-balance text-base leading-relaxed text-ink-muted">
              &ldquo;{siteConfig.tagline}&rdquo; — End-to-end rooftop solar installation
              with subsidy support, 5-year free maintenance and savings up to 90% on
              your electricity bills.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {siteConfig.offerings.map((o) => {
                const Icon = offeringIcons[o.icon as keyof typeof offeringIcons];
                return (
                  <span
                    key={o.slug}
                    className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-white px-3.5 py-1.5 text-sm font-medium text-ink shadow-card"
                  >
                    <Icon className="h-3.5 w-3.5 text-amber-600" />
                    {o.label}
                  </span>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ScheduleVisitModal
                trigger={
                  <Button size="lg">
                    Get Free Consultation <ArrowRight className="h-4 w-4" />
                  </Button>
                }
              />
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex h-13 items-center gap-2 rounded-full border border-forest-200 bg-white px-6 text-sm font-semibold text-forest-800 shadow-card hover:bg-forest-50"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phoneDisplay}
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-sm text-ink-muted">
                <strong className="text-ink">Rated {siteConfig.rating.value}</strong> on{" "}
                {siteConfig.rating.platform} — {siteConfig.rating.count}+ happy customers
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-lift">
              <Image
                src="/images/hero/rooftop-installation.svg"
                alt="Rooftop solar panel installation on a residential home"
                width={720}
                height={560}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-white/95 p-4 shadow-lift backdrop-blur-sm sm:left-6 sm:right-auto sm:w-72">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-leaf-50">
                    <Zap className="h-4 w-4 text-leaf-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                      Monthly Savings
                    </p>
                    <p className="text-sm font-bold text-ink">Up to ₹18,000/month</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-3 -top-3 hidden rounded-2xl bg-forest-800 px-4 py-3 text-white shadow-lift sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-leaf-300">
                Payback
              </p>
              <p className="text-lg font-bold">3–4 Yrs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
