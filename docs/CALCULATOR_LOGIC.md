# Solar Calculator Logic — How the Numbers Are Calculated

The "Calculate your savings" tool on the homepage estimates subsidy, system
size, and payback period from just a pincode and monthly electricity bill.
All logic lives in **one file**: `src/lib/calculator.ts`. Every constant has
an inline comment explaining where it came from, so you (or anyone on your
team, not just a developer) can update it when subsidy rates or tariffs
change.

## What it calculates, step by step

1. **Estimated monthly electricity consumption (units/kWh)**
   `monthly bill ÷ average tariff per unit (₹7.5, editable)`

2. **Recommended system size (kW)**
   Based on offsetting ~90% of that consumption, assuming 4 kWh of
   generation per kW of installed capacity per day (a conservative
   North-India average that accounts for monsoon/winter derating).

3. **Government subsidy estimate**
   Follows the PM Surya Ghar: Muft Bijli Yojana central subsidy slabs:
   - ₹30,000 per kW for the first 2kW
   - ₹18,000 for the 3rd kW
   - Capped at ₹78,000 total for systems 3kW and above

   **⚠️ Subsidy rates can change with government policy.** If the scheme
   is updated, edit `CALCULATOR_ASSUMPTIONS.subsidy` in
   `src/lib/calculator.ts` — there is nowhere else this needs to change.

4. **Savings percentage**
   Fixed at 90% (the marketed range), or 80% for very small bills (under
   ₹800/month) where fixed system losses matter proportionally more.

5. **Payback period**
   `(installed cost − subsidy) ÷ (annual savings)`, using an assumed
   installed cost of ₹55,000/kW. This is a rough industry-average figure —
   **update `CALCULATOR_ASSUMPTIONS.installedCostPerKw`** if your actual
   pricing differs meaningfully, since this number directly affects the
   payback period shown to prospective customers.

## Important: this is a lead-generation estimate, not a quote

The calculator result explicitly says "Estimate only. Final sizing depends
on a free on-site rooftop survey" — keep this disclaimer in place
(`src/components/marketing/sections/calculator-section.tsx`). Actual system
sizing depends on roof orientation, shading, sanctioned load, and other
site-specific factors that only an in-person survey can capture.

## Where pincode is used

Currently, pincode is collected and stored (for lead records and city
analysis) but does **not** change the calculation — generation potential
across UP, Rajasthan, MP, and Maharashtra (your current service area) is
similar enough that a single average is reasonable. If you expand to
regions with meaningfully different solar irradiance (e.g. far northeast
India), consider adding a pincode-to-irradiance lookup table.
