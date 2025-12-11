"use client";

import { useState } from "react";
import { useContext } from "react";
import { ModalStateContext } from "@/context/ModalStateContext";

import { NewTask } from "../organism/NewTask";
import { CirclePlus } from "lucide-react";

function Modal() {
  const modalContext = useContext(ModalStateContext);

  function handleClick() {
    modalContext.setModalState(true);
    console.log(modalContext.modalState);
  }

  const MyModal = () => {
    return <NewTask />;
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className=" bg-[#db4b2b] rounded-full hover:scale-105 duration-180 shadow-2xl backdrop-blur-3xl"
      >
        <CirclePlus className="text-white size-12 max-sm:size-10 m-3" />
      </button>
      {modalContext.modalState && <MyModal />}
    </div>
  );
}

export default Modal;
