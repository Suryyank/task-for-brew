import { NextResponse } from "next/server";
import { auth } from "@/lib/firebaseContext";
import { getAuth } from "firebase-admin/auth";

export async function POST(request: Request) {
  const { idToken } = await request.json();

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  const sessionCookie = await getAuth().createSessionCookie(idToken, {
    expiresIn,
  });

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: "session",
    value: sessionCookie,
    maxAge: expiresIn / 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    domain: process.env.COOKIE_DOMAIN,
  });

  return response;
}
