import Link from "next/link";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/marketing/logo";
import { SignOutButton } from "@/components/dashboard/sign-out-button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand">
      <header className="border-b border-forest-100 bg-white">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/dashboard">
            <Logo />
          </Link>
          <SignOutButton />
        </div>
      </header>
      <main className="container py-10">{children}</main>
    </div>
  );
}
