import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/marketing/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sand px-4 text-center">
      <Logo />
      <h1 className="mt-8 font-display text-6xl font-extrabold text-forest-800">404</h1>
      <p className="mt-3 text-lg text-ink-muted">
        This page doesn&apos;t exist — but your solar savings still do.
      </p>
      <Link href="/" className="mt-6">
        <Button size="lg">Back to Home</Button>
      </Link>
    </div>
  );
}
