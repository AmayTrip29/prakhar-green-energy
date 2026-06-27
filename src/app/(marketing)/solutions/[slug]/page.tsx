import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScheduleVisitModal } from "@/components/marketing/schedule-visit-modal";
import { FaqSection } from "@/components/marketing/sections/faq-section";
import { solutionDetails, solutionSlugs } from "@/lib/solutions-data";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const solution = solutionDetails[params.slug];
  if (!solution) return {};
  return {
    title: `${solution.title} | Prakhar Green Energy Solutions`,
    description: solution.tagline,
  };
}

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const solution = solutionDetails[params.slug];
  if (!solution) notFound();

  return (
    <>
      <section className="bg-gradient-to-b from-leaf-50/60 to-white py-14 md:py-20">
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center rounded-full bg-leaf-100 px-4 py-1.5 text-xs font-semibold text-leaf-700">
                {solution.category === "offering" ? "Our Offering" : "Solar Solution"}
              </span>
              <h1 className="mt-4 font-display text-4xl font-extrabold text-ink sm:text-5xl">
                {solution.title}
              </h1>
              <p className="mt-3 text-lg font-medium text-leaf-700">{solution.tagline}</p>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted">
                {solution.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <ScheduleVisitModal trigger={<Button size="lg">Get Free Consultation</Button>} />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex h-13 items-center gap-2 rounded-full border border-forest-200 px-6 text-sm font-semibold text-forest-800 hover:bg-forest-50"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl shadow-lift">
              <Image
                src={solution.heroImage}
                alt={solution.title}
                width={640}
                height={480}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-ink">Key Benefits</h2>
            <ul className="mt-5 space-y-3">
              {solution.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />
                  <span className="text-ink-muted">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-semibold text-forest-800">Ideal for:</p>
              <p className="mt-1 text-sm text-ink-muted">{solution.idealFor}</p>
            </div>
          </div>
        </div>
      </section>

      <FaqSection limit={5} />
    </>
  );
}
