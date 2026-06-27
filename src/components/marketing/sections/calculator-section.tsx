"use client";

import * as React from "react";
import { Calculator as CalculatorIcon, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScheduleVisitModal } from "@/components/marketing/schedule-visit-modal";
import { toast } from "@/components/ui/use-toast";
import type { CalculatorResult } from "@/lib/calculator";

export function CalculatorSection() {
  const [pincode, setPincode] = React.useState("226022");
  const [monthlyBill, setMonthlyBill] = React.useState(3000);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<CalculatorResult | null>(null);

  async function handleCalculate() {
    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      toast({
        title: "Invalid pincode",
        description: "Please enter a valid 6-digit pincode.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pincode, monthlyBill }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Couldn't calculate",
          description: data.error ?? "Please try again.",
          variant: "destructive",
        });
        return;
      }

      setResult(data.result);
    } catch {
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="calculator" className="section-padding bg-white">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-leaf-600">
            Unlock Your Solar Savings
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            Calculate your savings
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Enter your pincode and average monthly electricity bill to calculate how
            much you can save with rooftop solar.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 sm:mx-auto sm:max-w-xl">
          <div className="rounded-2xl border border-leaf-200 bg-leaf-50/50 p-4 text-center">
            <p className="text-xs font-medium text-ink-muted">Subsidy</p>
            <p className="mt-1 font-display text-xl font-bold text-leaf-700">
              ₹{result ? Math.round(result.estimatedSubsidyRupees / 1000) : 78}K
            </p>
          </div>
          <div className="rounded-2xl border border-leaf-200 bg-leaf-50/50 p-4 text-center">
            <p className="text-xs font-medium text-ink-muted">Savings</p>
            <p className="mt-1 font-display text-xl font-bold text-leaf-700">
              {result ? result.estimatedSavingsPct : 90}%
            </p>
          </div>
          <div className="rounded-2xl border border-leaf-200 bg-leaf-50/50 p-4 text-center">
            <p className="text-xs font-medium text-ink-muted">Lifetime</p>
            <p className="mt-1 font-display text-xl font-bold text-leaf-700">
              {result ? result.systemLifespanYears : 25} Yrs
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-forest-100 bg-sand p-6 shadow-card sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-100">
              <CalculatorIcon className="h-5 w-5 text-leaf-700" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-leaf-600">
                Solar Calculator
              </p>
              <p className="font-display text-lg font-bold text-ink">
                Estimate your savings in seconds
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <Label htmlFor="calc-pincode">PIN Code</Label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                <Input
                  id="calc-pincode"
                  className="pl-11"
                  placeholder="Enter 6-digit pincode"
                  value={pincode}
                  maxLength={6}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="calc-bill">Monthly Electricity Bill</Label>
                <span className="text-sm font-bold text-leaf-700">₹{monthlyBill}</span>
              </div>
              <input
                id="calc-bill"
                type="range"
                min={500}
                max={50000}
                step={100}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-forest-100 accent-leaf-500"
              />
              <div className="mt-1 flex justify-between text-xs text-ink-muted">
                <span>₹500</span>
                <span>₹50,000</span>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handleCalculate} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Calculating...
                </>
              ) : (
                <>
                  Calculate now <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {result && (
            <div className="mt-6 space-y-3 rounded-2xl bg-forest-800 p-5 text-white animate-fade-up">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-forest-200">Recommended System</p>
                  <p className="font-display text-lg font-bold text-amber-400">
                    {result.recommendedSystemSizeKw} kW
                  </p>
                </div>
                <div>
                  <p className="text-forest-200">Govt. Subsidy</p>
                  <p className="font-display text-lg font-bold text-amber-400">
                    ₹{result.estimatedSubsidyRupees.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-forest-200">Monthly Savings</p>
                  <p className="font-display text-lg font-bold text-amber-400">
                    ₹{result.estimatedMonthlySavingsRupees.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-forest-200">Est. Payback</p>
                  <p className="font-display text-lg font-bold text-amber-400">
                    {result.estimatedPaybackYears} yrs
                  </p>
                </div>
              </div>
              <ScheduleVisitModal
                defaultPincode={pincode}
                defaultMonthlyBill={monthlyBill}
                trigger={
                  <Button variant="secondary" className="w-full mt-2">
                    Get an exact quote — Schedule Free Visit
                  </Button>
                }
              />
              <p className="text-center text-[11px] text-forest-200">
                Estimate only. Final sizing depends on a free on-site rooftop survey.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
