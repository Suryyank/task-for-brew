"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../../../../public/logo/NameLogo.png";
import React, { useEffect, useState } from "react";
import CustomButton from "@/app/components/atoms/CustomButton";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/db/firebaseContext";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsub();
  }, []);

  async function handleLogout() {
    await signOut(auth);
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/");
  }

  //
  const forbidRoutes = [
    "/login",
    "/sign-up",
    "/sign-in/factor-one",
    "/swapshop",
    "/canvas",
  ];

  if (forbidRoutes.includes(pathname)) return null;

  // AUTH BUTTONS
  const AuthButtons = (
    <>
      {isLoggedIn ? (
        <CustomButton
          title="Logout"
          className="text-white hover:bg-black/80  hover:scale-103 duration-180"
          onClick={handleLogout}
        />
      ) : (
        <>
          <CustomButton
            title="Login"
            className="rounded-4xl px-6 hover:scale-103 duration-150 text-sm"
            onClick={() => router.push("/login")}
          />
          <CustomButton
            title="Sign-Up"
            className="rounded-4xl px-6 hover:scale-103 duration-150 text-sm"
            onClick={() => router.push("/sign-up")}
          />
        </>
      )}
    </>
  );

  return (
    <>
      {/* mobile */}
      <nav className="max-sm sm:hidden fixed top-4 left-4 right-4 z-50 border-black border">
        <div className="flex justify-between items-center">
          <Image
            src={Logo}
            alt=""
            width={100}
            height={100}
            className="mb-1 mx-2"
            onClick={() => router.push("/")}
          />
          <div className="flex items-center justify-between gap-2">
            {AuthButtons}
          </div>
        </div>
      </nav>

      {/* Desktop */}
      <nav className="fixed max-sm:hidden top-4 left-12 right-12 z-50 rounded-4xl bg-white backdrop-blur-sm shadow-md py-3 px-6 border-2">
        <div className="flex justify-between items-center">
          <Image
            src={Logo}
            alt=""
            width={100}
            height={100}
            className="mb-1 mx-2 cursor-pointer"
            onClick={() => router.push("/")}
          />

          <div className="flex items-center justify-center gap-6 py-0 border-0 border-black">
            {AuthButtons}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
