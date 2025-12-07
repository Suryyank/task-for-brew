import React from "react";
import TaskCard from "../components/molecule/TaskCard";
import LogOutButton from "../components/atoms/LogOutButton";

const page = () => {
  return (
    <div>
      <TaskCard
        title={"Buy Grocery"}
        description={"Get Onions"}
        dueDate={"020"}
        priority={"low"}
        status={"done"}
      />
      <LogOutButton />
    </div>
  );
};

export default page;
