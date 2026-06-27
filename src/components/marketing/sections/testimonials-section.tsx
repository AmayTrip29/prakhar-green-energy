"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export function TestimonialsSection() {
  const [index, setIndex] = React.useState(0);
  const testimonials = siteConfig.testimonials;
  const current = testimonials[index];

  function next() {
    setIndex((i) => (i + 1) % testimonials.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-leaf-600">
            Testimonials
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            90% of our customers recommend us
          </h2>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-3xl shadow-lift">
            <Image
              src="/images/testimonials/installation-team.svg"
              alt="Prakhar installation team mounting a solar panel"
              width={640}
              height={420}
              className="h-72 w-full object-cover sm:h-80"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-forest-900/90 to-transparent p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-400">
                Customer Story
              </p>
              <p className="mt-1 font-display text-xl font-bold text-white">
                Electricity Bills down from ₹4,000 to ₹300!
              </p>
              <p className="mt-1 text-sm text-forest-100">Mahendra Thakre, Lucknow</p>
            </div>
          </div>

          <div>
            <div className="rounded-2xl border border-leaf-200 bg-leaf-50/60 p-6 text-center">
              <p className="font-display text-4xl font-extrabold text-ink">
                {siteConfig.rating.value}
              </p>
              <div className="mt-2 flex justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="mt-2 text-sm text-ink-muted">
                Rated {siteConfig.rating.value} on {siteConfig.rating.platform} with{" "}
                {siteConfig.rating.count}+ ratings
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-forest-100 bg-white p-6 shadow-card">
              <Quote className="h-6 w-6 text-leaf-300" />
              <p className="mt-3 min-h-[72px] text-sm leading-relaxed text-ink">
                {current.quote}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-ink">{current.customerName}</p>
                  <p className="text-sm text-ink-muted">{current.city}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-forest-100 text-ink-muted hover:bg-forest-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-leaf-500 text-white hover:bg-leaf-600"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-3 flex justify-center gap-1.5">
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 w-6 rounded-full transition-colors",
                    i === index ? "bg-leaf-500" : "bg-forest-100"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
