import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { MobileStickyBar } from "@/components/marketing/mobile-sticky-bar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="pb-20 lg:pb-0">{children}</main>
      <SiteFooter />
      <MobileStickyBar />
    </>
  );
}
