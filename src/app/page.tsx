"use client";
import Image from "next/image";
import { NewTask } from "./components/organism/NewTask";
import CustomButton from "./components/atoms/CustomButton";
import { useRouter } from "next/navigation";

import HeroSection from "./components/organism/HeroSection";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <HeroSection />
      <div className="mt-100"></div>
    </div>
  );
}
