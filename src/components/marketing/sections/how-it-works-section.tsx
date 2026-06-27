import { siteConfig } from "@/lib/site-config";

export function HowItWorksSection() {
  return (
    <section className="section-padding bg-leaf-50/40">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-leaf-600">
            How It Works
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            We Handle Everything. You Just Save.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {siteConfig.howItWorks.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl border border-forest-100 bg-white p-6 shadow-card"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-leaf-500 font-display text-lg font-bold text-white">
                {step.step}
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
