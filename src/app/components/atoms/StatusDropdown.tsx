"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Circle } from "lucide-react";

export type StatusOption = {
  label: string;
  value: string;
  color: string; // hex or tailwind-friendly
};

type StatusDropdownProps = {
  value: string;
  options: StatusOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
};

const StatusDropdown = ({
  value,
  options,
  onChange,
  disabled = false,
}: StatusDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative inline-block text-sm">
      <button
        disabled={disabled}
        onClick={() => setOpen((p) => !p)}
        className={`
          flex items-center gap-2 rounded-full px-3 py-1
          font-semibold transition
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-black/5"}
        `}
      >
        <Circle fill={selected?.color} size={10} />
        {selected?.label}
        <ChevronDown
          size={14}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-44 rounded-xl border bg-white shadow-lg overflow-hidden">
          {options.map((opt) => {
            const isActive = opt.value === value;

            return (
              <button
                key={opt.value}
                onClick={() => {
                  if (!isActive) onChange(opt.value);
                  setOpen(false);
                }}
                className={`
                  w-full flex items-center gap-2 px-3 py-2 text-left
                  transition
                  ${isActive ? "bg-black/5 cursor-default" : "hover:bg-black/10"}
                `}
              >
                <Circle fill={opt.color} size={10} />
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
