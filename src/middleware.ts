import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role;

    if (pathname.startsWith("/admin/dashboard")) {
      if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
        const loginUrl = new URL("/admin/login", req.url);
        return NextResponse.redirect(loginUrl);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Always let the wrapped middleware() above run, where we perform
      // the precise per-path role check. For /dashboard we still require
      // *some* authenticated token; for /admin/dashboard we deliberately
      // return true here so middleware() can redirect to /admin/login
      // specifically (instead of withAuth's default /login redirect).
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return !!token;
        }
        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/dashboard/:path*"],
};
