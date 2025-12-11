import { initializeApp, cert, getApps } from "firebase-admin/app";

if (!getApps().length) {
  const privateKey = process.env
    .FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n")
    .replace(/\\\\n/g, "\n")
    .trim();

  console.log("Private key length:", privateKey.length);

  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey,
    }),
  });

  console.log("Admin SDK initialized");
}

export {};
