"use client";

import { createContext, useContext } from "react";
import { initializeApp, FirebaseApp, getApps } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase ONCE
export const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth: Auth = getAuth(app);
export const db = getFirestore(app);

// --- Type for context ---

interface FirebaseContextType {
  app: FirebaseApp;
  auth: Auth;
  db: typeof db;
}

// --- Create context WITH DEFAULT VALUE ---
export const FirebaseContext = createContext<FirebaseContextType>({
  app,
  auth,
  db,
});

// --- Provider ---
export const FirebaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <FirebaseContext.Provider value={{ app, auth, db }}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Hooks and functions
// export const useFirebase = () => useContext(FirebaseContext);

export async function getTasks() {
  const snapshot = await getDocs(collection(db, "tasks"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
