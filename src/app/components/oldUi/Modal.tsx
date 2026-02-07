"use client";

import { useModalContext } from "@/context/ModalStateContext";

import { NewTask } from "../organism/NewTask";
import { CirclePlus } from "lucide-react";

function Modal() {
  const modalContext = useModalContext();

  function handleClick() {
    modalContext.setModalState(true);
    console.log(modalContext.modalState);
  }

  const MyModal = () => {
    return (
      <div className="">
        <NewTask />
      </div>
    );
  };
  return (
    <div>
      {/* {!modalContext.modalState && (
        <button
          onClick={handleClick}
          className=" bg-orange-500 rounded-full hover:scale-105 duration-180 shadow-2xl backdrop-blur-3xl hover:bg-orange-600 fixed bottom-10 right-12 z-50 max-sm:bottom-8 max-sm:right-8"
        >
          <CirclePlus className="text-white size-11 max-sm:size-10 m-3" />
        </button>
      )} */}
      {modalContext.modalState && <MyModal />}
    </div>
  );
}

export default Modal;
