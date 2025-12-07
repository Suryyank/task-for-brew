import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifySessionCookie } from "@/utils/verifySession";

export async function proxy(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  const res = await fetch(`${req.nextUrl.origin}/api/verify-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session }),
  });

  const { valid } = await res.json();

  if (!valid && !req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (valid && req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/tasks/:path*"],
};
