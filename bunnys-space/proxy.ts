import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

// Runs before routes render (Next.js 16 "proxy")
export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Only protect /admin/*
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // Allow the login page itself
  if (pathname === "/admin/login") return NextResponse.next();

  const session = await auth();
  const role = (session?.user as any)?.role;

  if (role !== "ADMIN") {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
