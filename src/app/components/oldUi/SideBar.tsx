"use client";

import React, { Children, ReactNode, useState } from "react";
import CustomButton from "../atoms/CustomButton";
import { useContext } from "react";
import { ModalStateContext } from "@/context/ModalStateContext";
import { ChevronFirst, ChevronLast } from "lucide-react";

export function SideBar(children: ReactNode) {
  const [expanded, setExpanded] = useState(false);

  const modalContext = useContext(ModalStateContext);
  const openModal = () => {
    modalContext.setModalState(true);
    console.log(modalContext.modalState);
  };

  const handleExpand = () => {
    setExpanded((curr) => !curr);
  };

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          {/*    Image   */}
          <button
            onClick={handleExpand}
            className="p-1.5 rounded-2xl bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <ul className="flex-1 px-4">{children}</ul>
      </nav>
    </aside>
  );
}

type SideBarItemData = {
  icon: string;
  text: string;
  active: boolean;
  alert: string;
};

export default function SideBarItem({
  icon,
  text,
  active,
  alert,
}: SideBarItemData) {
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
        active
          ? "bg-linear-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      {icon}
      <span className="w-52 ml-3">{text}</span>
      {alert && (
        <div className="absolute right-2 w-2 h-2 rounded bg-indigo-400"></div>
      )}
    </li>
  );
}
