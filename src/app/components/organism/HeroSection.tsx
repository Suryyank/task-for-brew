"use client";
import React from "react";
import CustomButton from "../atoms/CustomButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HeroImg from "../../../../public/heroback/heroimg.jpg";
import Logo from "../../../../public/logo/NameLogo.png";
import { ArrowBigRight, ArrowRightFromLine, MoveRightIcon } from "lucide-react";

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="light:bg-white flex items-center">
      <Image
        src={HeroImg}
        alt=""
        width={3840}
        height={2160}
        className="absolute h-full w-full inset-0 opacity-90"
      />
      <div className="relative flex-col items-center justify-center mx-auto mt-50 max-md:mx-5">
        <h1 className="text-6xl font-extrabold text-white">
          Simplify. Organise. Stay Ahead.
        </h1>
        <h1 className="text-2xl font-extrabold text-amber-50/70 max-w-2xl max-sm:max-w-2xs mt-1">
          Keep track of your day-to-day tasks with Tasker and unlock your true
          potential.
        </h1>

        <div className="mt-8">
          <CustomButton
            title={"Get Started"}
            className="rounded-4xl px-8 hover:scale-103 duration-150"
            onClick={() => {
              router.push("/sign-up");
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
