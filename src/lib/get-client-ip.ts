import { NextRequest } from "next/server";

/**
 * Extracts the client's IP address from request headers.
 * Vercel sets x-forwarded-for / x-real-ip; we trust the first entry in
 * x-forwarded-for since Vercel's edge network controls that header and it
 * cannot be spoofed by the client past the edge.
 */
export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
