import { describe, it, expect } from "vitest";
import { calculateSolarSavings, CALCULATOR_ASSUMPTIONS } from "@/lib/calculator";

describe("calculateSolarSavings", () => {
  it("estimates a reasonable system size for a typical ₹3000 bill", () => {
    const result = calculateSolarSavings({ pincode: "226022", monthlyBillRupees: 3000 });
    expect(result.recommendedSystemSizeKw).toBeGreaterThan(0);
    expect(result.recommendedSystemSizeKw).toBeLessThan(10);
  });

  it("caps subsidy at the maximum slab for large systems", () => {
    const result = calculateSolarSavings({ pincode: "226022", monthlyBillRupees: 50000 });
    expect(result.estimatedSubsidyRupees).toBeLessThanOrEqual(
      CALCULATOR_ASSUMPTIONS.subsidy.maxSubsidy
    );
  });

  it("applies tier 1 subsidy correctly for small systems (<=2kW)", () => {
    // A very small bill should recommend a system at or below the minimum 1kW floor.
    const result = calculateSolarSavings({ pincode: "226022", monthlyBillRupees: 500 });
    expect(result.recommendedSystemSizeKw).toBeGreaterThanOrEqual(1);
    // At 1kW, subsidy should equal 1 * perKwTier1.
    if (result.recommendedSystemSizeKw <= CALCULATOR_ASSUMPTIONS.subsidy.tier1MaxKw) {
      expect(result.estimatedSubsidyRupees).toBe(
        result.recommendedSystemSizeKw * CALCULATOR_ASSUMPTIONS.subsidy.perKwTier1
      );
    }
  });

  it("never returns negative values", () => {
    const result = calculateSolarSavings({ pincode: "226022", monthlyBillRupees: 0 });
    expect(result.estimatedMonthlyUnits).toBeGreaterThanOrEqual(0);
    expect(result.estimatedSubsidyRupees).toBeGreaterThanOrEqual(0);
    expect(result.estimatedMonthlySavingsRupees).toBeGreaterThanOrEqual(0);
  });

  it("returns a 25-year lifespan constant regardless of input", () => {
    const result = calculateSolarSavings({ pincode: "226022", monthlyBillRupees: 7500 });
    expect(result.systemLifespanYears).toBe(25);
  });

  it("caps displayed payback period at 6 years to avoid misleading outliers", () => {
    const result = calculateSolarSavings({ pincode: "226022", monthlyBillRupees: 50000 });
    expect(result.estimatedPaybackYears).toBeLessThanOrEqual(6);
  });
});
