"use client";
import React from "react";
import CustomButton from "../atoms/CustomButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HeroImg from "../../../../public/heroback/heroimg3.jpg";
import Logo from "../../../../public/logo/NameLogo.png";
import {
  ArrowBigRight,
  ArrowRightFromLine,
  Italic,
  MoveRightIcon,
} from "lucide-react";
import {
  robotoserifFont,
  robotoserifItalicsFont,
  monserratFont,
} from "@/app/fonts/fonts";

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="light:bg-white flex items-center">
      {/* <Image
        src={HeroImg}
        alt=""
        width={10667}
        height={6667}
        style={{ objectFit: "fill" }} //10667x6667
        className="absolute h-full w-full inset-0 opacity-90"
        placeholder="blur"
        loading="lazy"
      /> */}
      <div className="relative flex-col items-center justify-center mx-auto mt-50 max-md:mx-5">
        <h1
          className={`text-6xl  font-extrabold text-black ${robotoserifFont.className}`}
        >
          Simplify.{" "}
          <span className={`${robotoserifItalicsFont.className}`}>
            Organise.
          </span>{" "}
          Optimise.
        </h1>
        <div className="flex flex-col items-center justify-center mt-5">
          <h1
            className={`text-2xl text-center font-extrabold max-w-2xl max-sm:max-w-2xs mt-1 text-black ${monserratFont.className}`}
          >
            Keep track of your day-to-day tasks with Tasker and unlock your true
            potential.
          </h1>
          <div className="mt-8 flex items-center justify-center gap-4">
            <CustomButton
              title={"Start Here"}
              className="text-white outline-2 outline-black hover:bg-white hover:[background-image:none] hover:text-black hover:outline-2 hover:outline-black "
              onClick={() => {
                router.push("/login");
              }}
            />
            <CustomButton
              title={"Explore More"}
              onClick={() => {
                document
                  .getElementById("Features")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-white outline-2 outline-black hover:bg-white hover:[background-image:none] hover:text-black hover:outline-2 hover:outline-black "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
