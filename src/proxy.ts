import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifySessionCookie } from "@/utils/verifySession";

export async function proxy(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  // call our API instead
  const res = await fetch(`${req.nextUrl.origin}/api/verify-session`, {
    method: "POST",
    body: JSON.stringify({ session }),
    headers: { "Content-Type": "application/json" },
  });

  const { valid } = await res.json();

  const isLoginPage = req.nextUrl.pathname.startsWith("/login");

  if (!valid && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (valid && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/tasks/:path*"],
};
