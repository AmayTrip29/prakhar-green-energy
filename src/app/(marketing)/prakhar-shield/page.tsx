import type { Metadata } from "next";
import { ShieldCheck, CalendarCheck, Wrench, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScheduleVisitModal } from "@/components/marketing/schedule-visit-modal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "PrakharShield™ — India's Only Guaranteed Solar Savings Plan",
  description:
    "PrakharShield is a money-back promise that protects every unit you generate, year after year.",
};

const icons = { ShieldCheck, CalendarCheck, Wrench, Smartphone } as const;

export default function PrakharShieldPage() {
  const { prakharShield } = siteConfig;

  return (
    <>
      <section className="bg-forest-800 bg-grid-pattern bg-grid py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-leaf-300">
              {prakharShield.eyebrow}
            </p>
            <h1 className="mt-2 font-display text-4xl font-extrabold text-amber-400 sm:text-5xl">
              {prakharShield.name}
              <sup className="text-xl">™</sup>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-forest-100">
              {prakharShield.headline} — {prakharShield.description}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-2.5 text-sm font-semibold text-amber-300">
              <ShieldCheck className="h-4 w-4" />
              Money-back promise at ₹{prakharShield.moneyBackRate}/unit
            </div>
            <div className="mt-8">
              <ScheduleVisitModal
                trigger={<Button variant="secondary" size="lg">Get Free Consultation</Button>}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-display text-2xl font-bold text-ink">
              What&apos;s included
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {prakharShield.benefits.map((benefit) => {
                const Icon = icons[benefit.icon as keyof typeof icons];
                return (
                  <div
                    key={benefit.title}
                    className="rounded-2xl border border-forest-100 bg-sand p-6"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-100">
                      <Icon className="h-5 w-5 text-leaf-700" />
                    </div>
                    <p className="mt-3 font-semibold text-ink">{benefit.title}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <h3 className="font-display text-lg font-bold text-forest-800">
                How the money-back promise works
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                If your system generates fewer units than the amount promised at the
                time of installation in any given year, we pay you ₹
                {prakharShield.moneyBackRate} for every shortfall unit — directly,
                with full transparency on promised vs. actual generation via the
                Prakhar monitoring app.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
