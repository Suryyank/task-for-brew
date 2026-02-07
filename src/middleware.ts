import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import "@/db/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
  runtime: "nodejs",
};

export async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value;
  const url = req.nextUrl.clone();
  const path = url.pathname;

  const isPublic = path === "/login";
  const isLanding = path === "/";
  const isProtected = path.startsWith("/dashboard");

  if (!sessionCookie) {
    if (isProtected) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  try {
    await getAuth().verifySessionCookie(sessionCookie, true);

    if (isPublic || isLanding) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (err) {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("session");
    return res;
  }
}
