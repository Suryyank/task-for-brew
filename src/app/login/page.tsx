"use client";
import loginbg from "../../../public/loginpagebg/loginbg.jpg";
import { useState } from "react";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/db/firebaseContext";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //////////////////////////////////////////////////////////////
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const idToken = await result.user.getIdToken();

      await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
        credentials: "include",
      });

      // 4. Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
  ///////////////////////////////

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Image
        src={loginbg}
        alt=""
        width={3840}
        height={2160}
        className="absolute h-lvh w-full inset-0 opacity-90 loading-lazy"
      />
      <div className="relative w-full max-w-md bg-white border border-gray-200 shadow-2xl backdrop-blur-3xl rounded-2xl p-8">
        {/* Accent */}
        <div className="h-1 w-14 bg-[#db452b] rounded-full mb-6"></div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
        <p className="text-sm text-gray-500 mb-6">
          Log in to access your dashboard.
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#db452b] focus:border-[#db452b] outline-none"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#db452b] focus:border-[#db452b] outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl font-semibold bg-[#db452b] text-white hover:bg-[#db452b]/80 transition-colors"
          >
            Log In
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          Don’t have an account?{" "}
          <a
            href="/sign-up"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
