/**
 * Solar savings calculator — core business logic.
 *
 * IMPORTANT: These are estimation formulas based on publicly documented
 * MNRE (Ministry of New & Renewable Energy) subsidy slabs as of the
 * PM Surya Ghar: Muft Bijli Yojana scheme, and standard industry rules of
 * thumb for system sizing. They are estimates for lead-generation purposes,
 * not a binding quote. Real quotes require a site visit (panel orientation,
 * shading, roof type, sanctioned load).
 *
 * Update ASSUMPTIONS below if subsidy slabs, tariffs, or sizing ratios
 * change — every figure has a comment explaining where it came from so a
 * non-engineer can safely edit this file later. See docs/CALCULATOR_LOGIC.md.
 */

export const CALCULATOR_ASSUMPTIONS = {
  // Average cost per unit (kWh) assumed for residential consumers in the
  // service area, used to convert a monthly bill into estimated consumption.
  avgTariffPerUnit: 7.5,

  // Average solar generation per kW of installed capacity per day in North
  // India (conservative, accounts for monsoon/winter derating).
  avgGenerationPerKwPerDay: 4,

  // Central subsidy under PM Surya Ghar (residential only):
  // ₹30,000/kW for the first 2 kW, ₹18,000/kW for the next 1 kW (i.e. up to
  // 3kW totals ₹78,000), capped at ₹78,000 for systems 3kW and above.
  subsidy: {
    perKwTier1: 30000, // for each kW up to 2kW
    tier1MaxKw: 2,
    perKwTier2: 18000, // for the 3rd kW
    tier2MaxKw: 3,
    maxSubsidy: 78000,
  },

  // System lifespan used for "Lifetime" stat on the calculator.
  systemLifespanYears: 25,

  // Conservative installed cost per kW (post-subsidy market range varies by
  // brand/state; used only to estimate payback period for the lead magnet).
  installedCostPerKw: 55000,
} as const;

export interface CalculatorInput {
  pincode: string;
  monthlyBillRupees: number;
}

export interface CalculatorResult {
  estimatedMonthlyUnits: number;
  recommendedSystemSizeKw: number;
  estimatedSubsidyRupees: number;
  estimatedSavingsPct: number;
  estimatedPaybackYears: number;
  estimatedMonthlySavingsRupees: number;
  systemLifespanYears: number;
}

function roundToHalf(value: number): number {
  return Math.round(value * 2) / 2;
}

export function calculateSolarSavings(
  input: CalculatorInput
): CalculatorResult {
  const { avgTariffPerUnit, avgGenerationPerKwPerDay, subsidy, systemLifespanYears, installedCostPerKw } =
    CALCULATOR_ASSUMPTIONS;

  const monthlyBill = Math.max(0, input.monthlyBillRupees);

  // 1. Back out estimated monthly consumption (units) from the bill.
  const estimatedMonthlyUnits = monthlyBill / avgTariffPerUnit;

  // 2. Estimate required system size to offset ~90% of that consumption.
  //    Daily units needed = monthly units / 30. System size = daily units / avg generation per kW.
  const dailyUnitsNeeded = (estimatedMonthlyUnits * 0.9) / 30;
  const rawSizeKw = dailyUnitsNeeded / avgGenerationPerKwPerDay;
  const recommendedSystemSizeKw = Math.max(1, roundToHalf(rawSizeKw));

  // 3. Subsidy calculation per PM Surya Ghar slabs.
  let estimatedSubsidyRupees = 0;
  if (recommendedSystemSizeKw <= subsidy.tier1MaxKw) {
    estimatedSubsidyRupees = recommendedSystemSizeKw * subsidy.perKwTier1;
  } else if (recommendedSystemSizeKw <= subsidy.tier2MaxKw) {
    estimatedSubsidyRupees =
      subsidy.tier1MaxKw * subsidy.perKwTier1 +
      (recommendedSystemSizeKw - subsidy.tier1MaxKw) * subsidy.perKwTier2;
  } else {
    estimatedSubsidyRupees = subsidy.maxSubsidy;
  }
  estimatedSubsidyRupees = Math.round(
    Math.min(estimatedSubsidyRupees, subsidy.maxSubsidy)
  );

  // 4. Savings percentage — fixed at the marketed 80–90% range, scaled
  //    slightly down for very small bills (where fixed inverter/wiring
  //    losses matter proportionally more).
  const estimatedSavingsPct = monthlyBill < 800 ? 80 : 90;

  // 5. Payback period: net cost (installed cost − subsidy) divided by
  //    monthly savings, converted to years.
  const installedCost = recommendedSystemSizeKw * installedCostPerKw;
  const netCost = Math.max(0, installedCost - estimatedSubsidyRupees);
  const estimatedMonthlySavingsRupees = Math.round(
    monthlyBill * (estimatedSavingsPct / 100)
  );
  const estimatedPaybackYears =
    estimatedMonthlySavingsRupees > 0
      ? roundToHalf(netCost / (estimatedMonthlySavingsRupees * 12))
      : 0;

  return {
    estimatedMonthlyUnits: Math.round(estimatedMonthlyUnits),
    recommendedSystemSizeKw,
    estimatedSubsidyRupees,
    estimatedSavingsPct,
    estimatedPaybackYears: Math.min(estimatedPaybackYears, 6), // marketed range is 3-4yrs typical; cap display outliers
    estimatedMonthlySavingsRupees,
    systemLifespanYears,
  };
}
