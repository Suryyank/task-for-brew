"use client";
import Image from "next/image";
import { NewTask } from "./components/organism/NewTask";
import CustomButton from "./components/atoms/CustomButton";
import { useRouter } from "next/navigation";

import HeroSection from "./components/organism/HeroSection";
import IntNavBar from "./components/molecule/IntNavBar";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="relative z-50 mx-0 mt-0 max-sm:mx-4">
        <IntNavBar />
      </div>
      <HeroSection />

      <div className="mt-100 text-black">hello</div>
    </div>
  );
}
