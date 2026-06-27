# Security Overview

This document summarizes the security measures implemented in this codebase
and where to find them, for your own review or a third-party security audit.

## Authentication

- **Password hashing**: bcrypt with cost factor 12 (`src/lib/auth.ts`,
  `src/app/api/auth/register/route.ts`).
- **Session strategy**: JWT-based sessions via NextAuth, 30-day expiry.
- **Role-based access control**: `CUSTOMER`, `ADMIN`, `SUPER_ADMIN` roles
  enforced both in middleware (`src/middleware.ts`) and at the API layer
  (`src/lib/require-admin.ts`) — defense in depth, not just route-level
  gating.
- **Login attempt logging**: every login attempt (success or failure) is
  recorded in the `LoginAttempt` table for audit/anomaly detection.
- **Timing-attack mitigation**: a dummy bcrypt comparison runs even when an
  email doesn't exist, so response times don't leak which emails are
  registered.
- **Account enumeration protection**: registration errors are deliberately
  vague ("an account with these details already exists") rather than
  confirming which specific field (email vs phone) collided.

## Input validation

- **Every API route** validates input through Zod schemas
  (`src/lib/validations.ts`) before touching the database — no raw user
  input reaches Prisma queries.
- **Phone numbers**: validated against an Indian mobile number pattern.
- **Honeypot fields**: lead and contact forms include an invisible
  `website` field; bots that fill it are silently rejected without
  revealing the anti-spam mechanism.

## Rate limiting

Implemented via Upstash Redis sliding-window limiters
(`src/lib/rate-limit.ts`), applied per-IP:

| Endpoint | Limit |
|---|---|
| Lead/contact form submission | 5 per 10 minutes |
| Calculator | 15 per 10 minutes |
| Login | 8 per 15 minutes |
| Registration | 5 per hour |

Falls back to an in-memory limiter if Upstash isn't configured (dev-only —
**not safe for production**, since it doesn't share state across serverless
instances; see warning comment in `src/lib/rate-limit.ts`).

## HTTP security headers

Set globally in `next.config.js`:

- `Strict-Transport-Security` (HSTS, 2-year max-age, includes subdomains)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (prevents clickjacking)
- `Content-Security-Policy` (restricts script/style/image/connect sources)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (disables camera/microphone access by default)

## Data protection

- **Environment secrets**: all API keys, database URLs, and auth secrets
  are read from environment variables, never hard-coded. `.env*` files are
  git-ignored.
- **SQL injection**: not possible by design — all database access goes
  through Prisma's parameterized query builder, never raw string-concatenated
  SQL.
- **XSS**: all user-facing text is rendered through React's default
  escaping. The one exception is rendering blog post HTML content via
  `dangerouslySetInnerHTML` — this is safe **only** because blog content is
  authored exclusively by your own admin team through the admin panel, not
  accepted from public/customer input. If you ever open blog authoring to
  non-admin users, sanitize with a library like DOMPurify first (flagged
  with a comment at that exact line in
  `src/app/(marketing)/blog/[slug]/page.tsx`).
- **Admin-authored content trust boundary**: the same logic applies
  anywhere else HTML might be rendered from the database in the future —
  always check who can write that data before trusting it as HTML.

## Email/WhatsApp notification failure handling

Leads are **always saved to the database first**, before any notification
attempt. If Resend or WhatsApp's API is down or misconfigured, the lead is
never lost — only the notification fails, and that failure is logged
server-side (`src/app/api/leads/route.ts`).

## Recommended periodic reviews

- Rotate `NEXTAUTH_SECRET` and re-issue sessions if you suspect any secret
  exposure.
- Review `LoginAttempt` records periodically for repeated failures from a
  single IP (a sign of brute-forcing) — currently requires a direct
  database query or Prisma Studio; consider building an admin-facing view
  if this becomes a regular need.
- Keep dependencies updated — run `npm audit` periodically and update
  `package.json` versions, especially for `next`, `next-auth`, and
  `prisma`.
