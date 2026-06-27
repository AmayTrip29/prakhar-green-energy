"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScheduleVisitModal } from "@/components/marketing/schedule-visit-modal";
import { siteConfig } from "@/lib/site-config";

export function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex gap-2 border-t border-forest-100 bg-white p-3 shadow-lift lg:hidden">
      <a href={`tel:${siteConfig.phone}`} className="flex-1">
        <Button variant="outline" className="w-full">
          <Phone className="h-4 w-4" />
          Call Now
        </Button>
      </a>
      <ScheduleVisitModal
        trigger={<Button className="flex-1 w-full">Get Free Visit</Button>}
      />
    </div>
  );
}
