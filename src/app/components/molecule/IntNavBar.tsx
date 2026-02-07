"use client";

import React from "react";
import GlassButton from "../atoms/GlassButton";
import Image from "next/image";
//hover:[background-image:none]

import Logo from "../../../../public/logo/NameLogo.png";
import { useRouter } from "next/navigation";
import CustomButton from "../atoms/CustomButton";

const IntNavBar = () => {
  const router = useRouter();
  return (
    <nav className="flex items-center justify-between w-full pt-2 pb-2 px-4">
      <div>
        <Image src={Logo} alt="Logo" width={120} height={100} />
      </div>
      <div className="px-3 flex items-center justify-center gap-4">
        <CustomButton
          title={"Log-In"}
          className="hover:outline-2 outline-black bg-white/0 bg-none text-black hover:scale-105 duration-120"
          onClick={() => {
            router.push("/login");
          }}
        />
        <CustomButton
          title={"Get started"}
          className="text-white hover:bg-black/80  hover:scale-103 duration-180"
          onClick={() => {
            router.push("/sign-up");
          }}
        />
      </div>
    </nav>
  );
};

export default IntNavBar;
