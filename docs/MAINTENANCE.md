# Maintenance Guide — Making Changes Without a Developer

Most day-to-day content changes don't require touching code logic — they're
centralized in a small number of files. This guide covers the most common
edits.

## Changing business info (phone, email, address, social links)

Edit `src/lib/site-config.ts` → the `siteConfig` object at the top. Every
page reads from this single file, so a phone number change here updates the
header, footer, every CTA button, and the WhatsApp notification recipient
all at once.

## Changing FAQ answers

Same file, `siteConfig.faqs` array. Add, remove, or edit `{ question, answer }`
entries — the FAQ page and homepage FAQ preview both read from this array
automatically.

## Changing testimonials

`siteConfig.testimonials` array in the same file. Each entry needs
`customerName`, `city`, and `quote`; `billBefore`/`billAfter` are optional.

## Changing cities served

`siteConfig.citiesServed` array. Add a new `{ state, cities: [...] }` entry
for a new state, or add a city name to an existing state's array. This
updates the footer, the `/cities` page, and the header's "Cities" dropdown
automatically.

## Changing stats (homes solarized, MW installed, etc.)

`siteConfig.stats` object. These are currently static figures — update them
periodically as your real numbers grow. There's no automatic counter tied
to actual installation records yet (see "Suggested Next Steps" below).

## Adding/editing a Solutions page (Rooftop, On-Grid, Commercial, etc.)

Edit `src/lib/solutions-data.ts` → the `solutionDetails` object. Each key
(e.g. `"rooftop"`) becomes a page at `/solutions/rooftop` automatically —
no routing code needs to change.

## Publishing a blog post

Log in at `/admin/login`, go to **Blog Posts** → **New Post**. Title,
slug, excerpt, and content (basic HTML) are entered directly in the admin
UI — no code or redeploy needed. Content is stored in the database and
appears live immediately (the blog list page revalidates hourly, or
instantly if you visit the post's direct URL).

## Managing leads

Log in at `/admin/login` → **Leads**. Every form submission across the
site (Schedule a Free Visit modal, contact page, calculator) appears here.
Update the status dropdown to track a lead through your sales pipeline
(New → Contacted → Site Visit Scheduled → ... → Won/Lost).

## Changing colors / brand styling

All brand colors are defined once in `tailwind.config.js` under
`theme.extend.colors` (`forest`, `leaf`, `amber`, `ink`, `sand`). Changing a
hex value there updates every component using that color name across the
entire site.

## Suggested next steps (not yet built, but straightforward to add)

- An admin UI to edit `siteConfig` values without touching code (currently
  requires a developer to edit `site-config.ts` and redeploy).
- An admin UI for registering new customer `SolarSystem` records (currently
  via Prisma Studio — see `docs/MONITORING_INTEGRATION.md`).
- A password-reset flow for customer/admin accounts (currently requires
  direct database access to reset a forgotten password).
