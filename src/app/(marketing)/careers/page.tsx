import type { Metadata } from "next";
import { Mail, MapPin, Briefcase } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Careers",
  description: `Join the team at ${siteConfig.name} and help bring solar to every rooftop in India.`,
};

const openRoles = [
  {
    title: "Solar Site Engineer",
    location: "Lucknow, UP",
    type: "Full-time",
    description:
      "Conduct rooftop surveys, design 3D solar layouts, and supervise on-site installation quality.",
  },
  {
    title: "Solar Sales Consultant",
    location: "Kanpur, UP",
    type: "Full-time",
    description:
      "Meet prospective customers, explain solar economics and subsidy benefits, and close consultations into installations.",
  },
  {
    title: "Customer Success Associate",
    location: "Lucknow, UP (Remote-friendly)",
    type: "Full-time",
    description:
      "Support existing customers through installation, subsidy paperwork, and post-installation maintenance scheduling.",
  },
];

export default function CareersPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
            Careers at Prakhar
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Help us drive the Har Ghar Solar mission. We&apos;re looking for people who
            care about clean energy and great customer experiences.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl space-y-5">
          {openRoles.map((role) => (
            <div
              key={role.title}
              className="rounded-2xl border border-forest-100 bg-sand p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">{role.title}</h2>
                  <div className="mt-1.5 flex flex-wrap items-center gap-4 text-xs text-ink-muted">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {role.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5" /> {role.type}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {role.description}
              </p>
              <a
                href={`mailto:${siteConfig.email}?subject=Application: ${encodeURIComponent(role.title)}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-leaf-700 hover:text-leaf-800"
              >
                <Mail className="h-4 w-4" /> Apply via Email
              </a>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-ink-muted">
          Don&apos;t see a role that fits? Send your resume to{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-semibold text-leaf-700">
            {siteConfig.email}
          </a>{" "}
          and tell us how you&apos;d like to contribute.
        </p>
      </div>
    </section>
  );
}
