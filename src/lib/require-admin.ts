import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Verifies the current session belongs to an ADMIN or SUPER_ADMIN.
 * Returns the session if authorized, or null if not — callers should
 * respond with 401/403 when null is returned.
 */
export async function requireAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
    return null;
  }

  return session;
}
