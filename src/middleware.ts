import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "firebase-admin/auth";
import "@/db/firebaseAdmin";

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/tasks/:path*"],
  runtime: "nodejs",
};

export async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value;
  const url = req.nextUrl.clone();

  const isLoginPage = url.pathname.startsWith("/login");

  // No session → redirect to login
  if (!sessionCookie) {
    if (!isLoginPage) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  try {
    // Direct session cookie verification (NO fetch)
    await getAuth().verifySessionCookie(sessionCookie, true);

    // If user tries to access login page while authenticated
    if (isLoginPage) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (err) {
    // Invalid cookie → remove it
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("session");
    return res;
  }
}
