import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScheduleVisitModal } from "@/components/marketing/schedule-visit-modal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cities We Serve",
  description:
    "Prakhar Green Energy Solutions installs rooftop solar across Uttar Pradesh, Rajasthan, Madhya Pradesh, and Maharashtra.",
};

export default function CitiesPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
            Powering Homes Across India
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Present in {siteConfig.stats.citiesCount} cities across{" "}
            {siteConfig.stats.statesCount} states, and growing every day.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {siteConfig.citiesServed.map((group) => (
            <div
              key={group.state}
              id={group.state.toLowerCase().replace(/\s+/g, "-")}
              className="rounded-2xl border border-forest-100 bg-sand p-6"
            >
              <h2 className="font-display text-lg font-bold text-forest-800">
                {group.state}
              </h2>
              <ul className="mt-3 space-y-2">
                {group.cities.map((city) => (
                  <li key={city} className="flex items-center gap-2 text-sm text-ink-muted">
                    <MapPin className="h-4 w-4 text-leaf-600" />
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-forest-800 bg-grid-pattern bg-grid p-8 text-center text-white sm:p-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Don&apos;t see your city listed?
          </h2>
          <p className="mt-2 text-forest-100">
            We&apos;re expanding fast. Reach out and we&apos;ll let you know if we can
            serve your location.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <ScheduleVisitModal trigger={<Button size="lg">Get Free Consultation</Button>} />
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex h-13 items-center gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold text-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
