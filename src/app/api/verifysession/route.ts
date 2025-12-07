import { NextResponse } from "next/server";
import { initAdmin } from "@/lib/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";

initAdmin();

export async function POST(req: Request) {
  const { session } = await req.json();

  if (!session) {
    return NextResponse.json({ valid: false });
  }

  try {
    await getAuth().verifySessionCookie(session, true);
    return NextResponse.json({ valid: true });
  } catch {
    return NextResponse.json({ valid: false });
  }
}
