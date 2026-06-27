import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function OfferingsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-leaf-600">
            Our Offerings
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            Get Solar for
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {siteConfig.solutions.map((solution) => (
            <Link
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              className="group overflow-hidden rounded-3xl border border-forest-100 bg-sand transition-shadow hover:shadow-lift"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={solution.image}
                  alt={solution.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="font-display text-xl font-bold text-ink">
                    {solution.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    {solution.shortDescription}
                  </p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-leaf-50 text-leaf-700 transition-colors group-hover:bg-leaf-500 group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
