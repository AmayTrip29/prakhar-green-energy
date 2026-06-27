# Connecting Real Solar Monitoring Data

The customer dashboard (`/dashboard`) is built to show **real** generation
data from each customer's solar inverter. Until a real inverter API is
connected, the dashboard honestly shows a "monitoring not connected yet"
state rather than inventing numbers — this is intentional and should not be
changed to display fake data.

## How the data model works

- Every customer has at most one `SolarSystem` record (see
  `prisma/schema.prisma`), created by an admin once their installation is
  complete.
- `SolarSystem.monitoringConnected` is `false` by default. The dashboard
  API (`src/app/api/dashboard/route.ts`) checks this flag and returns a
  clear empty state if it's false.
- Once connected, `GenerationReading` rows (one per day, per system) feed
  the "Today's Generation", "This Month Saved", and weekly chart.

## Option A: Manual entry (simplest, no integration needed)

If you don't yet have inverter API access for your installed base, you can
have your team manually log daily generation per customer using
Prisma Studio (`npx prisma studio`) or by building a simple admin form
(not yet included — see "Suggested Next Steps" below) that creates
`GenerationReading` rows. Set `monitoringConnected: true` on the
`SolarSystem` once you start logging data for that customer.

## Option B: Real inverter API integration

Most Indian solar installations use one of a handful of inverter/monitoring
brands. Each exposes a cloud API you can poll on a schedule (e.g. via a
Vercel Cron Job) to pull real generation data:

| Brand | API docs | Notes |
|---|---|---|
| Growatt | [server-api.growatt.com](https://server-api.growatt.com) | Common in residential installs; requires plant + device IDs |
| Solis (Ginlong) | [Solis Cloud API](https://www.soliscloud.com) | OAuth-based; rate limited |
| Huawei FusionSolar | [Huawei NetEco Open API](https://support.huawei.com) | Enterprise-grade; requires partner API access request |
| Deye / SUNSYNK | Sunsynk Connect API | Common for hybrid/off-grid systems |

### Integration pattern (applies to any of the above)

1. Add an `inverterBrand` and `inverterSerialNo` to each `SolarSystem`
   record when the system is installed (already in the schema).
2. Create a new file `src/lib/inverter-providers/<brand>.ts` that
   implements a function like:
   ```ts
   async function fetchDailyGeneration(serialNo: string, date: Date): Promise<{ kwh: number }>
   ```
3. Create a Vercel Cron Job (`vercel.json` → `crons`) that runs once daily,
   loops over all `SolarSystem` rows where `monitoringConnected: true`,
   calls the relevant provider function, and upserts a `GenerationReading`
   row with `source: "inverter_api"`.
4. Convert kWh to ₹ saved using the customer's known tariff (or a
   reasonable default — see `CALCULATOR_ASSUMPTIONS.avgTariffPerUnit` in
   `src/lib/calculator.ts`) and to CO₂ avoided using a standard grid
   emission factor (~0.82 kg CO₂/kWh for the Indian grid, per CEA's most
   recent baseline — verify against the latest CEA database before
   hard-coding).

## Suggested next steps (not yet built)

- An admin UI for registering a new `SolarSystem` against a customer
  (currently requires direct database access via Prisma Studio).
- A scheduled job skeleton for Option B once you pick a specific inverter
  brand to integrate first.

Until then, the honest empty-state dashboard is the correct, "no
fake/filler" behavior for any customer who logs in.
