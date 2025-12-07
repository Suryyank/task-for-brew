import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { initAdmin } from "@/lib/firebaseAdmin";

initAdmin();

export async function POST(req: Request) {
  const { session } = await req.json();

  try {
    const decoded = await getAuth().verifySessionCookie(session, true);
    return NextResponse.json({ valid: true, user: decoded });
  } catch {
    return NextResponse.json({ valid: false });
  }
}
