import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function FinalCtaSection() {
  return (
    <section className="bg-forest-800 bg-grid-pattern bg-grid py-16">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold text-amber-400 sm:text-4xl">
            Ready to Go Solar?
          </h2>
          <p className="mt-3 text-base text-forest-100">
            Get a free site visit and personalised 3D solar design.
          </p>
          <a
            href={`tel:${siteConfig.phone}`}
            className="mt-6 inline-flex h-13 items-center gap-2 rounded-full bg-amber-500 px-8 text-sm font-bold text-forest-900 shadow-lift transition-transform hover:scale-[1.02]"
          >
            <Phone className="h-4 w-4" />
            Call {siteConfig.phoneDisplay}
          </a>
          <p className="mt-4 text-sm text-forest-200">
            Serving homes, housing societies and businesses across Uttar Pradesh and
            beyond.
          </p>
        </div>
      </div>
    </section>
  );
}
