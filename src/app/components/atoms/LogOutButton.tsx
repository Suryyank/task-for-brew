"use client";
import React from "react";

import { signOut } from "firebase/auth";

const LogOutButton = () => {
  return (
    <div>
      <button
        onClick={() => signOut}
        className="rounded-2xl px-4 py-2 font-semibold transition-colors duration-150 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Log Out
      </button>
    </div>
  );
};

export default LogOutButton;
