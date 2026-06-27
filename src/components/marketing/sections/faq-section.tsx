import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/lib/site-config";

export function FaqSection({ limit }: { limit?: number }) {
  const faqs = limit ? siteConfig.faqs.slice(0, limit) : siteConfig.faqs;

  return (
    <section className="section-padding bg-leaf-50/30">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-leaf-600">FAQ</p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-ink-muted">All your questions, answered.</p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
