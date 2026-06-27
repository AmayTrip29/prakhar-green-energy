# Deployment Guide

This guide walks through deploying the Prakhar Green Energy Solutions
website from this repository to production, step by step. No prior DevOps
experience assumed.

## 1. Prerequisites

- A [GitHub](https://github.com) account (you're using `AmayTrip29`)
- A [Vercel](https://vercel.com) account (free tier is enough to start)
- A [Neon](https://neon.tech) account for PostgreSQL (free tier is enough to start)
- A [Resend](https://resend.com) account for transactional email
- A [Upstash](https://upstash.com) account for Redis-based rate limiting
- (Optional, for WhatsApp notifications) A Meta Business + WhatsApp Cloud
  API setup — see `docs/WHATSAPP_SETUP.md`

## 2. Push this code to GitHub

```bash
cd prakhar-green-energy
git init
git add .
git commit -m "Initial commit: Prakhar Green Energy Solutions website"
git branch -M main
git remote add origin https://github.com/AmayTrip29/prakhar-green-energy.git
git push -u origin main
```

## 3. Create the database (Neon)

1. Go to [neon.tech](https://neon.tech) → New Project.
2. Name it `prakhar-green-energy`, choose a region close to your users
   (e.g. Mumbai/Singapore for India).
3. Once created, go to **Connection Details** and copy:
   - The **pooled** connection string → this is your `DATABASE_URL`
   - The **direct** connection string → this is your `DATABASE_URL_UNPOOLED`

## 4. Set up Resend (email)

1. Sign up at [resend.com](https://resend.com).
2. Add and verify your sending domain (e.g. `prakhargreenenergy.com`) under
   **Domains**. Until verified, Resend only lets you send to your own
   account email — fine for testing, not for production leads.
3. Create an API key under **API Keys** → copy it as `RESEND_API_KEY`.

## 5. Set up Upstash (rate limiting)

1. Sign up at [upstash.com](https://upstash.com) → Create Database (Redis).
2. Choose the region closest to your Vercel deployment region.
3. Copy the **REST URL** and **REST TOKEN** into `UPSTASH_REDIS_REST_URL`
   and `UPSTASH_REDIS_REST_TOKEN`.

## 6. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the
   `AmayTrip29/prakhar-green-energy` GitHub repository.
2. Vercel will auto-detect Next.js. Leave the build command as default
   (`npm run build` — this also runs `prisma generate` automatically via
   the `postinstall` script).
3. The repo's `vercel.json` pins serverless functions to the `sin1`
   (Singapore) region — Vercel has no Mumbai/India region as of this
   writing, and Singapore is the lowest-latency option available for users
   in Uttar Pradesh and neighboring states. Pick your Neon database region
   to match (also Singapore, if available) to minimize database
   round-trip latency.
4. Before deploying, add all environment variables from `.env.example`
   under **Environment Variables**. At minimum for a working deploy:
   - `DATABASE_URL`, `DATABASE_URL_UNPOOLED`
   - `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (your production URL, e.g. `https://www.prakhargreenenergy.com`)
   - `NEXT_PUBLIC_SITE_URL` (same as above)
   - `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS`, `LEAD_NOTIFICATION_EMAIL`
   - `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
5. Click **Deploy**.

## 7. Run database migrations

After the first deploy, run migrations against your production database.
From your local machine (with `.env.local` pointing at the **same** Neon
database):

```bash
npx prisma migrate deploy
```

## 8. Seed the admin account

```bash
SEED_ADMIN_EMAIL="your-real-admin-email@example.com" \
SEED_ADMIN_PASSWORD="a-strong-temporary-password" \
npm run db:seed
```

Then immediately log in at `/admin/login` and treat that password as
temporary — there's no self-service "change password" UI yet, so to rotate
it, generate a new bcrypt hash and update the `User.passwordHash` column
directly via `npx prisma studio`, or extend the admin panel with a password
change form (see "Suggested Next Steps" in `docs/MAINTENANCE.md`).

## 9. Connect your custom domain

In Vercel → Project → Settings → Domains, add your domain (e.g.
`prakhargreenenergy.com`) and follow the DNS instructions shown. Once SSL
provisions (a few minutes), update `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL`
to match, and redeploy.

## 10. Replace placeholder images

See `docs/IMAGE_REPLACEMENT_GUIDE.md` — the site is fully functional with
placeholders but should not be considered launch-ready until real photos
are in place.

## 11. (Optional) Set up WhatsApp notifications

See `docs/WHATSAPP_SETUP.md`. Lead capture, email notifications, and the
admin dashboard all work without this — WhatsApp is an enhancement, not a
dependency.

---

## Ongoing maintenance

For day-to-day content changes (phone number, cities served, FAQ answers,
testimonials, etc.), see `docs/MAINTENANCE.md` — almost everything is
centralized in two files: `src/lib/site-config.ts` and
`src/lib/solutions-data.ts`.
