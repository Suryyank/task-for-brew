import { getAuth } from "firebase-admin/auth";
import { initAdmin } from "@/db/firebaseAdmin";

initAdmin();

export async function verifySessionCookie(session?: string) {
  if (!session) return false;

  try {
    await getAuth().verifySessionCookie(session, true);
    return true;
  } catch {
    return false;
  }
}
