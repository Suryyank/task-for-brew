import "@/db/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { idToken } = await request.json();
  console.log("SIGN-IN API HIT");
  console.log("Received idToken:", !!idToken);

  try {
    const session = await getAuth().createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 1 * 1000,
    });

    console.log("SESSION COOKIE:", session ? "OK" : "FAILED");
    console.log("SIGN-IN ROUTE EXECUTED");

    const res = NextResponse.json({ success: true });
    res.cookies.set("session", session, {
      httpOnly: true,
      secure: false,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("SESSION COOKIE ERROR:", err);
    return NextResponse.json({ success: false, error: String(err) });
  }
}
