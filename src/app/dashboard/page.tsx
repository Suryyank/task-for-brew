"use client";
import React from "react";

import SideBar from "../components/oldUi/SideBar";
import TaskList from "../components/TaskList";
import { useContext } from "react";
import { ModalStateContext } from "@/context/ModalStateContext";

import Image from "next/image";
import loginbg from "../../../public/loginpagebg/loginbg.jpg";
import { CirclePlus } from "lucide-react";
import NavBar from "../components/molecule/NavBar";
import Modal from "../components/oldUi/Modal";
import SideBarItem from "../components/oldUi/SideBar";
import TaskDetails from "../components/molecule/TaskDetails";
import BottomBar from "../components/molecule/BottomBar";
import EditPanel from "../components/molecule/EditPanel";
import { NewTask } from "../components/organism/NewTask";
// style={{.   bg-fixed bg-cover bg-center
//   backgroundImage: `url(${loginbg.src})`,
// }}
const page = () => {
  const modalContext = useContext(ModalStateContext);

  const openModal = () => {
    modalContext.setModalState(true);
    console.log(modalContext.modalState);
  };

  return (
    <div>
      <div className="bg-white flex items-center justify-center gap-2">
        <div className="min-h-lvh mt-30 mx-4 relative w-auto border border-gray-700/35 rounded-2xl">
          <TaskList />
          <TaskDetails
            title={"Get Grocery"}
            priority={"high"}
            status={"to-do"}
            desc={"From Kondli Bazaar"}
            date={"28 Jan"}
          />
          <TaskDetails
            title={"Get Grocery"}
            priority={"medium"}
            status={"to-do"}
            desc={"From Kondli Bazaar"}
            date={"28 Jan"}
          />
          <TaskDetails
            title={"Get Grocery"}
            priority={"low"}
            status={"to-do"}
            desc={"From Kondli Bazaar"}
            date={"28 Jan"}
          />
        </div>
        <div>
          <EditPanel />
        </div>
      </div>
      <BottomBar />
      {modalContext.modalState && <NewTask />}
    </div>
  );
};

export default page;
