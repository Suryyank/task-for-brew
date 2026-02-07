import React from "react";

type GlassButtonProps = {
  title: string;
  onClick?: () => {} | void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const GlassButton = ({ title, onClick, type, className }: GlassButtonProps) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`${className} rounded-4xl px-5 py-2 font-normal text-black border-[1.5px] border-black backdrop-blur-3xl hover:bg-amber-50/12 transition-colors duration-150
        delay-0 hover:bg-amber-50/20$`}
      >
        {title}
      </button>
    </div>
  );
};

export default GlassButton;
