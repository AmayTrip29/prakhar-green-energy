import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name}. Call ${siteConfig.phoneDisplay} or fill out our contact form.`,
};

export default function ContactPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Have a question about going solar? Our team typically responds within 24
            hours.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-4 rounded-2xl border border-forest-100 bg-sand p-5 hover:bg-leaf-50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-100 text-leaf-700">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Call Us
                </p>
                <p className="font-semibold text-ink">{siteConfig.phoneDisplay}</p>
              </div>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-4 rounded-2xl border border-forest-100 bg-sand p-5 hover:bg-leaf-50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-100 text-leaf-700">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Email Us
                </p>
                <p className="font-semibold text-ink">{siteConfig.email}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-forest-100 bg-sand p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-100 text-leaf-700">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Office
                </p>
                <p className="font-semibold text-ink">
                  {siteConfig.address.locality} – {siteConfig.address.pincode}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-forest-100 bg-sand p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
