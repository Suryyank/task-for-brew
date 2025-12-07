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
      className={`rounded-2xl px-3 py-2 font-extrabold text-white bg-[#db4b2b] w-auto hover:bg-[#db4b2b]/80 ${className}`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
