import React, { useState } from "react";
import TaskDetails from "./TaskDetails";
import CustomButton from "../atoms/CustomButton";

const EditPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleState = () => {
    setIsOpen((p) => !p);
  };
  return (
    <div className="relative h-screen w-fit bg-amber-500">
      <h1>this is the panel</h1>
      <CustomButton title="Click" onClick={handleState} />
      {isOpen && (
        <div className="fixed right-0 top-0 w-[500px] bg-amber-200">
          <TaskDetails
            title={"Get Grocery"}
            priority={"high"}
            status={"to-do"}
            desc={"From Kondli Bazaar"}
            date={"28 Jan"}
          />
        </div>
      )}
    </div>
  );
};

export default EditPanel;
