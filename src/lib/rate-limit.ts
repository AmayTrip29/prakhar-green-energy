import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Rate limiting protects public API routes (lead form, calculator, login)
// from abuse and brute-force attempts. If Upstash env vars are not set
// (e.g. local dev without Redis configured), we fall back to an in-memory
// limiter so the app still runs — but production MUST set these env vars,
// since in-memory limits reset on every serverless cold start and don't
// share state across instances. See docs/DEPLOYMENT.md.

const hasUpstashConfig =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

let redis: Redis | null = null;
if (hasUpstashConfig) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

// In-memory fallback (dev-only safety net — NOT for production use across
// multiple serverless instances).
const memoryStore = new Map<string, { count: number; resetAt: number }>();

function memoryRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = memoryStore.get(key);
  if (!entry || entry.resetAt < now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }
  if (entry.count >= limit) {
    return { success: false, remaining: 0 };
  }
  entry.count += 1;
  return { success: true, remaining: limit - entry.count };
}

function makeLimiter(limit: number, windowSeconds: number) {
  const upstashLimiter = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
      })
    : null;

  return {
    async limit(identifier: string) {
      if (upstashLimiter) {
        return upstashLimiter.limit(identifier);
      }
      return memoryRateLimit(identifier, limit, windowSeconds * 1000);
    },
  };
}

// Lead/contact form submissions: 5 per 10 minutes per IP.
export const leadFormLimiter = makeLimiter(5, 600);

// Calculator: 15 per 10 minutes per IP (higher — users may adjust sliders).
export const calculatorLimiter = makeLimiter(15, 600);

// Login attempts: 8 per 15 minutes per IP — slows brute force without
// locking out legitimate users who mistype a password a couple of times.
export const loginLimiter = makeLimiter(8, 900);

// Registration: 5 per hour per IP.
export const registerLimiter = makeLimiter(5, 3600);
