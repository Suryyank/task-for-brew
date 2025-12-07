import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifySessionCookie } from "@/utils/verifySession";

export async function proxy(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  const isAuth = await verifySessionCookie(session);

  const isLoginPage = req.nextUrl.pathname.startsWith("/login");

  if (!isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuth && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/tasks/:path*"],
};
