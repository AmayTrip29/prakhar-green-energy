"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Home, Building, Building2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number."),
  pincode: z.string().trim().regex(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit pincode."),
  monthlyBill: z.coerce.number().min(0).optional(),
  propertyType: z.enum(["HOME", "HOUSING_SOCIETY", "COMMERCIAL"]),
  email: z.string().trim().email().optional().or(z.literal("")),
  website: z.string().optional().or(z.literal("")), // honeypot — server decides, not the client
});

type FormValues = z.infer<typeof formSchema>;

const propertyTypes: { value: FormValues["propertyType"]; label: string; icon: React.ReactNode }[] = [
  { value: "HOME", label: "Home", icon: <Home className="h-4 w-4" /> },
  { value: "HOUSING_SOCIETY", label: "Society", icon: <Building className="h-4 w-4" /> },
  { value: "COMMERCIAL", label: "Commercial", icon: <Building2 className="h-4 w-4" /> },
];

export function ScheduleVisitModal({
  trigger,
  defaultPincode,
  defaultMonthlyBill,
}: {
  trigger: React.ReactNode;
  defaultPincode?: string;
  defaultMonthlyBill?: number;
}) {
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: "HOME",
      pincode: defaultPincode ?? "",
      monthlyBill: defaultMonthlyBill,
    },
  });

  const propertyType = watch("propertyType");

  async function onSubmit(values: FormValues) {
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Couldn't submit your request",
          description: data.error ?? "Please try again or call us directly.",
          variant: "destructive",
        });
        return;
      }

      setSubmitted(true);
    } catch {
      toast({
        title: "Network error",
        description: "Please check your connection and try again, or call +91 7007629710.",
        variant: "destructive",
      });
    }
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setTimeout(() => {
        setSubmitted(false);
        reset();
      }, 200);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-0">
        {submitted ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-leaf-50">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="#1E9E5A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-forest-800">
              Request received!
            </h3>
            <p className="mt-2 text-sm text-ink-muted">
              A Prakhar solar consultant will call you within 24 hours to schedule your
              free rooftop survey.
            </p>
            <Button className="mt-6 w-full" onClick={() => handleOpenChange(false)}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className="bg-leaf-500 px-6 py-6 text-white">
              <h3 className="font-display text-2xl font-bold">Schedule a FREE Visit</h3>
              <p className="mt-1 text-sm text-leaf-50">
                Get a free rooftop survey &amp; 3D solar design. No obligation.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
              {/* Honeypot — visually hidden, bots fill it */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="absolute h-0 w-0 opacity-0"
                aria-hidden="true"
                {...register("website")}
              />

              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Your name"
                  error={!!errors.fullName}
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-ink-muted">
                    +91
                  </span>
                  <Input
                    id="phone"
                    placeholder="10-digit mobile"
                    className="pl-12"
                    error={!!errors.phone}
                    {...register("phone")}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    placeholder="226022"
                    error={!!errors.pincode}
                    {...register("pincode")}
                  />
                  {errors.pincode && (
                    <p className="mt-1 text-xs text-red-600">{errors.pincode.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="monthlyBill">Monthly Bill (₹)</Label>
                  <Input
                    id="monthlyBill"
                    type="number"
                    placeholder="3000"
                    {...register("monthlyBill")}
                  />
                </div>
              </div>

              <div>
                <Label>Property Type</Label>
                <div className="grid grid-cols-3 gap-2">
                  {propertyTypes.map((pt) => (
                    <button
                      key={pt.value}
                      type="button"
                      onClick={() => setValue("propertyType", pt.value)}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-xs font-medium transition-colors",
                        propertyType === pt.value
                          ? "border-leaf-500 bg-leaf-50 text-leaf-700"
                          : "border-forest-100 text-ink-muted hover:bg-forest-50"
                      )}
                    >
                      {pt.icon}
                      {pt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  "Request Free Consultation"
                )}
              </Button>
              <p className="text-center text-xs text-ink-muted">
                By submitting, you agree to be contacted by a Prakhar solar consultant.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
