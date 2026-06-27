import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/sections/hero-section";
import { OfferingsSection } from "@/components/marketing/sections/offerings-section";
import { WhyChooseUsSection } from "@/components/marketing/sections/why-choose-us-section";
import { PrakharShieldSection } from "@/components/marketing/sections/prakhar-shield-section";
import { StatsSection } from "@/components/marketing/sections/stats-section";
import { CalculatorSection } from "@/components/marketing/sections/calculator-section";
import { HowItWorksSection } from "@/components/marketing/sections/how-it-works-section";
import { MonitoringAppSection } from "@/components/marketing/sections/monitoring-app-section";
import { TestimonialsSection } from "@/components/marketing/sections/testimonials-section";
import { FaqSection } from "@/components/marketing/sections/faq-section";
import { BlogPreviewSection } from "@/components/marketing/sections/blog-preview-section";
import { PressSection } from "@/components/marketing/sections/press-section";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";

export const metadata: Metadata = {
  title: "Rooftop Solar Installation in Lucknow | Save up to 90% on Bills",
  description:
    "Prakhar Green Energy Solutions installs rooftop solar for homes, housing societies and businesses across Uttar Pradesh. Free site visit, subsidy support, 5-year maintenance.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OfferingsSection />
      <WhyChooseUsSection />
      <PrakharShieldSection />
      <StatsSection />
      <CalculatorSection />
      <HowItWorksSection />
      <MonitoringAppSection />
      <TestimonialsSection />
      <FaqSection limit={6} />
      <BlogPreviewSection />
      <PressSection />
      <FinalCtaSection />
    </>
  );
}
