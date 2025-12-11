import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import "@/db/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";

export const config = {
  matcher: [
    "/", // <-- protect landing page
    "/login", // <-- allow redirect logic
    "/dashboard/:path*",
    //"/profile/:path*",
    //"/tasks/:path*",
  ],
  runtime: "nodejs",
};

export async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value;
  const url = req.nextUrl.clone();
  const path = url.pathname;

  const isPublic = path === "/login";
  const isLanding = path === "/"; // you want to protect this
  const isProtected = path.startsWith("/dashboard");
  //path.startsWith("/tasks") ||
  //path.startsWith("/profile");

  // User not logged in
  if (!sessionCookie) {
    if (isProtected) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // User HAS a session cookie — verify it
  try {
    await getAuth().verifySessionCookie(sessionCookie, true);

    // Logged-in users should NOT see login or landing page
    if (isPublic || isLanding) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (err) {
    // Invalid or expired session cookie
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("session");
    return res;
  }
}
