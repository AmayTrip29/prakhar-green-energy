import { ShieldCheck, Sparkles, Wind, Wrench } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const icons = { ShieldCheck, Sparkles, Wind, Wrench } as const;

export function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-leaf-50/40">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-leaf-600">
            Why Choose Us
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            Why Families Across India Trust Prakhar
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {siteConfig.whyChooseUs.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-forest-100 bg-white p-6 shadow-card transition-shadow hover:shadow-lift"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-100">
                  <Icon className="h-6 w-6 text-leaf-700" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
