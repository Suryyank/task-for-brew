import React from "react";
import { Sparkle, Circle } from "lucide-react";
type props = {
  status: string;
};

const StatusLabel = ({ status }: props) => {
  return (
    <div className="flex items-center justify-between">
      <Sparkle
        strokeWidth={2}
        size={30}
        className="hover:text-pink-500 duration-150 hover:rotate-90"
      />
      <div className="flex items-center gap-2 rounded-full px-3 py-0.5 text-amber-700 bg-amber-500/20 font-semibold">
        <Circle fill="#BB4D00" size={10} className="relative mt-[1.5px]" />
        {status}
      </div>
    </div>
  );
};

export default StatusLabel;
