import React from "react";
import FilterSection from "../components/molecule/FilterSection";
import TaskList from "../components/TaskList";
import { NewTask } from "../components/organism/NewTask";

const page = () => {
  return (
    <div>
      <FilterSection />

      <TaskList />
      <NewTask />
    </div>
  );
};

export default page;
