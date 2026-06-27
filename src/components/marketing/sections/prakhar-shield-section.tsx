import Link from "next/link";
import { ShieldCheck, CalendarCheck, Wrench, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const icons = { ShieldCheck, CalendarCheck, Wrench, Smartphone } as const;

export function PrakharShieldSection() {
  const { prakharShield } = siteConfig;

  return (
    <section className="section-padding bg-forest-800 bg-grid-pattern bg-grid">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-leaf-300">
              {prakharShield.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-amber-400 sm:text-4xl">
              {prakharShield.name}
              <sup className="text-lg">™</sup>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-forest-100">
              {prakharShield.headline} — {prakharShield.description}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300">
              <ShieldCheck className="h-4 w-4" />
              Money-back promise at ₹{prakharShield.moneyBackRate}/unit
            </div>

            <div className="mt-6">
              <Link href="/prakhar-shield">
                <Button variant="secondary" size="lg">
                  Know More about PrakharShield <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {prakharShield.benefits.map((benefit) => {
              const Icon = icons[benefit.icon as keyof typeof icons];
              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-400/15">
                    <Icon className="h-5 w-5 text-amber-400" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-white">
                    {benefit.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
