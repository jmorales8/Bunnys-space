import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req: any) => {
  const isAdmin = req.auth?.user?.role === "ADMIN";
  const isLogin = req.nextUrl.pathname === "/admin/login";

  if (!isAdmin && !isLogin) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
