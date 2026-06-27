import Link from "next/link";
import { LayoutDashboard, Users, FileText } from "lucide-react";
import { Logo } from "@/components/marketing/logo";
import { SignOutButton } from "@/components/dashboard/sign-out-button";

const navItems = [
  { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/dashboard/leads", icon: Users },
  { label: "Blog Posts", href: "/admin/dashboard/blog", icon: FileText },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand">
      <header className="border-b border-forest-100 bg-forest-800">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/admin/dashboard">
            <Logo variant="dark" />
          </Link>
          <SignOutButton />
        </div>
      </header>
      <div className="container flex gap-8 py-8">
        <aside className="hidden w-56 shrink-0 md:block">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-ink-muted hover:bg-white hover:text-ink"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
