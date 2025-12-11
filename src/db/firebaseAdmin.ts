import { initializeApp, cert, getApps } from "firebase-admin/app";

console.log("ADMIN INIT FILE LOADED");

if (!getApps().length) {
  console.log("INITIALIZING ADMIN SDK...");

  const raw = process.env.FIREBASE_PRIVATE_KEY;
  console.log("RAW KEY PRESENT:", !!raw);

  const cleaned = raw?.replace(/\\n/g, "\n").replace(/\\\\n/g, "\n").trim();

  console.log("CLEANED KEY LENGTH:", cleaned?.length);

  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: cleaned,
    }),
  });

  console.log("ADMIN SDK INITIALIZED.");
} else {
  console.log("ADMIN SDK ALREADY INITIALIZED.");
}

export {};
