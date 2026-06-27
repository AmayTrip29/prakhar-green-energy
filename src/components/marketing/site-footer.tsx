import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/marketing/logo";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="bg-forest-800 bg-grid-pattern bg-grid text-leaf-50">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="dark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-forest-100">
              &ldquo;{siteConfig.tagline}&rdquo; — {siteConfig.description}
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 text-amber-300 hover:text-amber-200"
              >
                <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-forest-100 hover:text-white"
              >
                <Mail className="h-4 w-4" /> {siteConfig.email}
              </a>
              <p className="flex items-center gap-2 text-forest-100">
                <MapPin className="h-4 w-4" /> {siteConfig.address.locality} –{" "}
                {siteConfig.address.pincode}
              </p>
            </div>
            <div className="mt-5 flex gap-3">
              {[
                { Icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
                { Icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
                { Icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
                { Icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-amber-400">
              Solutions
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-forest-100 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-amber-400">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-forest-100 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/careers" className="text-forest-100 hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-amber-400">
              Cities We Serve
            </h4>
            <div className="mt-4 space-y-3 text-sm">
              {siteConfig.citiesServed.map((group) => (
                <div key={group.state}>
                  <p className="font-semibold text-leaf-300">{group.state}</p>
                  <p className="text-forest-100">{group.cities.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-forest-200 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap justify-center gap-x-2">
            {siteConfig.hashtags.join(" · ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
