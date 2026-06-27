import { Newspaper } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function PressSection() {
  return (
    <section className="section-padding bg-leaf-50/30">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-leaf-600">
            In The News
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            Powering Headlines
          </h2>
        </div>

        <div className="mx-auto mt-8 max-w-2xl space-y-4">
          {siteConfig.pressMentions.map((mention) => (
            <div
              key={mention.headline}
              className="flex items-start gap-4 rounded-2xl border border-forest-100 bg-white p-5 shadow-card"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-leaf-100 text-leaf-700">
                <Newspaper className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-ink">
                  {mention.publication}
                </p>
                <p className="text-xs text-ink-muted">{mention.date}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink">
                  {mention.headline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
