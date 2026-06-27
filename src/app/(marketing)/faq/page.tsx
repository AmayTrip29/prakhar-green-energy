import type { Metadata } from "next";
import { FaqSection } from "@/components/marketing/sections/faq-section";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about rooftop solar, subsidies, and installation with Prakhar Green Energy Solutions.",
};

export default function FaqPage() {
  return <FaqSection />;
}
