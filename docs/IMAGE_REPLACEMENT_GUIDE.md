# Image Replacement Guide

The repository ships with **placeholder SVG illustrations** (on-brand green/gold,
clearly labeled "PLACEHOLDER") in every photo slot so the site never shows a
broken image. **These must be replaced with real photography before the site
is considered launch-ready.**

## Why placeholders instead of real photos?

This project was generated without access to your actual installation photos
or a licensed stock photo subscription. Rather than invent fake "stock-style"
photography that could misrepresent your business, every image slot uses an
obviously-labeled placeholder. Swap them with:

1. **Real photos of your own installations** (strongly preferred — this is
   the most persuasive content on a solar site), or
2. **Licensed stock photography** (see suggested searches below).

## How to replace an image

1. Drop your new image into the matching folder under `public/images/`
   (e.g. `public/images/hero/rooftop-installation.jpg`).
2. Update the file extension in the corresponding source file if you're not
   using `.svg` (see table below for which file references which path).
3. Keep the same aspect ratio as the original placeholder for the cleanest
   layout — see "Recommended size" below.
4. Re-deploy (Vercel redeploys automatically on git push).

No code changes are needed beyond the file extension, since every image is
referenced through a single constant path in `src/lib/site-config.ts` or
`src/lib/solutions-data.ts`.

## Image slots

| Slot | Used in | Recommended size | Suggested stock search (if not using your own photos) |
|---|---|---|---|
| `hero/rooftop-installation` | Homepage hero | 1440×1120 | "rooftop solar panel installation house" |
| `solutions/homes` | Homepage offerings card | 1280×840 | "residential solar panels roof" |
| `solutions/housing-societies` | Homepage offerings card | 1280×840 | "apartment building solar panels aerial" |
| `solutions/commercial` | Homepage offerings card | 1280×840 | "commercial warehouse solar panels aerial" |
| `solutions/homes-hero` | /solutions/homes page | 1280×960 | "happy family solar home India" |
| `solutions/rooftop-hero` | /solutions/rooftop page | 1280×960 | "solar installer mounting panels" |
| `solutions/on-grid-hero` | /solutions/on-grid page | 1280×960 | "grid tied solar inverter" |
| `solutions/off-grid-hero` | /solutions/off-grid page | 1280×960 | "off grid solar battery farmhouse" |
| `solutions/hybrid-hero` | /solutions/hybrid page | 1280×960 | "hybrid solar battery inverter" |
| `solutions/commercial-hero` | /solutions/commercial page | 1280×960 | "factory rooftop solar installation" |
| `solutions/housing-societies-hero` | /solutions/housing-societies page | 1280×960 | "housing society rooftop solar" |
| `testimonials/installation-team` | Homepage testimonials | 1280×840 | "solar installation technicians safety vests" |
| `og-cover` | Social share preview (all pages) | 1200×630 | Use your logo + tagline on brand-green background |

## Licensing note

If sourcing stock photography, use a properly licensed source (Unsplash
license, your own paid stock subscription, etc.) and confirm commercial-use
rights before publishing. Claude/Anthropic does not supply or warrant
licensed images — this guide only documents *where* images go and *what*
they should depict.

## Logo

The header/footer logo (`src/components/marketing/logo.tsx`) is currently a
hand-coded SVG sun-and-panel icon matching the original brand mark. If you
have an official vector logo file (.svg or .ai), replace the inline SVG
markup in that component, or drop a `logo.svg` into `public/` and swap the
component to render an `<Image>` instead.
