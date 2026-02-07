"use client";

import { useState } from "react";
import Image from "next/image";
import signupimg from "../../../public/signupbg/signupimg.jpg";
import { useRouter } from "next/router";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/db/firebaseContext";

export default function SignUpPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      // 1️⃣ Create Firebase account
      const result = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );

      const user = result.user;

      // 2️⃣ Get ID token
      const idToken = await user.getIdToken();

      // 3️⃣ Create session cookie (same as login)
      await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 👈 IMPORTANT
        body: JSON.stringify({ idToken }),
      });

      // 4️⃣ Redirect
      window.location.href = "/dashboard";
    } catch (error) {
      console.log("User Already Exists:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Image
        src={signupimg}
        alt=""
        width={3840}
        height={2160}
        className="absolute h-lvh w-full inset-0 opacity-90 loading-lazy"
      />
      <div className="relative w-full max-w-md bg-white border border-gray-200 shadow-2xl backdrop-blur-3xl rounded-xl p-8">
        {/* Accent Line */}
        <div className="h-1 w-14 bg-[#db452b] rounded-full mb-6"></div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Create your account
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Sign up to continue to your dashboard.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-gray-300 text-black rounded-lg px-3 py-2 focus:outline-black focus:outline-[1.5px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-gray-300 text-black rounded-lg px-3 py-2 focus:outline-black focus:outline-[1.5px]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl font-semibold bg-[#db452b] text-white hover:bg-[#db452b]/80 transition-colors"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
