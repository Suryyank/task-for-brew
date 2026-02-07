"use client";
import loginbg from "../../../public/loginpagebg/loginbg.jpg";
import { useState } from "react";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/db/firebaseContext";
import { Heart } from "lucide-react";
import { pacificoFont } from "../fonts/fonts";
import CustomButton from "../components/atoms/CustomButton";

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
        form.password,
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
        <div className="h-1 w-28 bg-linear-to-r from-pink-700 to-purple-400 rounded-full mb-6"></div>
        <div className="flex items-center gap-4 mb-2 bg-amber-400/0">
          <h2
            className={`text-3xl font-bold text-gray-900 ${pacificoFont.className}`}
          >
            Welcome Back
          </h2>
          <Heart color="#ff3224" fill="#ff3224" className="-mt-0.5" />
        </div>
        <p className="text-sm text-gray-500 mb-5">
          Sign in to access your dashboard.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">
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
          <CustomButton
            type="submit"
            title={"Log in"}
            className="w-full text-white font-semibold rounded-xl hover:opacity-90"
          />
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
