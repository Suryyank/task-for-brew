import React from "react";
import FilterSection from "../components/molecule/FilterSection";
import TaskList from "../components/TaskList";
import { NewTask } from "../components/organism/NewTask";
import Modal from "../components/molecule/Modal";
import Image from "next/image";
import loginbg from "../../../public/loginpagebg/loginbg.jpg";
const page = () => {
  return (
    <div
      className="min-h-screen w-full bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `url(${loginbg.src})`,
      }}
    >
      <div className="pt-40">
        <TaskList />
        <div className="fixed bottom-10 right-12 z-50 max-sm:bottom-8 max-sm:right-8">
          <Modal />
        </div>
      </div>
    </div>
  );
};

export default page;
