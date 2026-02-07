"use client";
import React from "react";

type ButtonProps = {
  title: string;
  onClick?: () => {} | void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onClick,
  type,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-full px-7 py-1.5 font-normal  bg-radial-[at_50%_20%] from-black/80 to-black to-150% ${className}`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
