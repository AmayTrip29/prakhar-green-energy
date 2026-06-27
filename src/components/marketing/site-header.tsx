"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone, LayoutDashboard } from "lucide-react";
import { useSession } from "next-auth/react";
import { Logo } from "@/components/marketing/logo";
import { Button } from "@/components/ui/button";
import { ScheduleVisitModal } from "@/components/marketing/schedule-visit-modal";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const offeringsNav = [
  { label: "Homes", href: "/solutions/homes" },
  { label: "Housing Societies", href: "/solutions/housing-societies" },
  { label: "Commercial", href: "/solutions/commercial" },
];

const solarSolutionsNav = [
  { label: "Rooftop Solar", href: "/solutions/rooftop" },
  { label: "On-Grid Solar", href: "/solutions/on-grid" },
  { label: "Off-Grid Solar", href: "/solutions/off-grid" },
  { label: "Hybrid Solar", href: "/solutions/hybrid" },
];

const citiesNav = siteConfig.citiesServed.map((s) => ({
  label: s.state,
  href: `/cities#${s.state.toLowerCase().replace(/\s+/g, "-")}`,
}));

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string }[];
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-sm font-medium text-forest-800 hover:text-leaf-600 transition-colors">
        {label}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div className="absolute left-0 top-full w-56 rounded-xl border border-forest-100 bg-white p-2 shadow-lift animate-fade-in">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm text-ink hover:bg-forest-50 hover:text-leaf-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-forest-100 bg-white/95 backdrop-blur-sm">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" aria-label="Prakhar Green Energy Solutions home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <NavDropdown label="Our Offerings" items={offeringsNav} />
          <NavDropdown label="Solar Solutions" items={solarSolutionsNav} />
          <NavDropdown label="Cities" items={citiesNav} />
          <Link
            href="/blog"
            className="text-sm font-medium text-forest-800 hover:text-leaf-600 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/#calculator"
            className="text-sm font-medium text-forest-800 hover:text-leaf-600 transition-colors"
          >
            Calculator
          </Link>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-2 rounded-full border border-forest-100 px-4 py-2 text-sm font-medium text-forest-800 hover:bg-forest-50"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phoneDisplay}
          </a>
          {session?.user ? (
            <Link href={session.user.role === "CUSTOMER" ? "/dashboard" : "/admin/dashboard"}>
              <Button variant="outline" size="md">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/login" className="text-sm font-medium text-forest-600 hover:text-leaf-600">
              Login
            </Link>
          )}
          <ScheduleVisitModal
            trigger={<Button size="md">Schedule a FREE Visit</Button>}
          />
        </div>

        <button
          className="lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-forest-100 bg-white lg:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {[
              { label: "Homes", href: "/solutions/homes" },
              { label: "Housing Societies", href: "/solutions/housing-societies" },
              { label: "Commercial", href: "/solutions/commercial" },
              { label: "Rooftop Solar", href: "/solutions/rooftop" },
              { label: "On-Grid Solar", href: "/solutions/on-grid" },
              { label: "Off-Grid Solar", href: "/solutions/off-grid" },
              { label: "Hybrid Solar", href: "/solutions/hybrid" },
              { label: "Cities We Serve", href: "/cities" },
              { label: "Blog", href: "/blog" },
              { label: "Solar Calculator", href: "/#calculator" },
              { label: "FAQs", href: "/faq" },
              { label: "About Us", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-forest-50"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-forest-100 pt-3">
              <a
                href={`tel:${siteConfig.phone}`}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-full border border-forest-100 px-4 py-2.5 text-sm font-medium text-forest-800"
                )}
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phoneDisplay}
              </a>
              {session?.user ? (
                <Link href={session.user.role === "CUSTOMER" ? "/dashboard" : "/admin/dashboard"}>
                  <Button variant="outline" className="w-full">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/login" className="text-center text-sm font-medium text-forest-600">
                  Customer / Admin Login
                </Link>
              )}
              <ScheduleVisitModal
                trigger={<Button className="w-full">Schedule a FREE Visit</Button>}
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
