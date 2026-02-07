import React from "react";

import StatusLabel from "../atoms/StatusLabel";
import PriorityLabel from "../atoms/PriorityLabel";
import { balsamiqsansFont } from "@/app/fonts/fonts";
{
  /* <TaskDetails
              title={"Get Grocery"}
              priority={"high"}
              status={"to-do"}
              desc={"From Kondli Bazaar"}
              date={"28 Jan"}
            /> */
}

type props = {
  title: string;
  priority: string;
  status: string;
  desc: string;
  date: string;
};
const priorityColors = {
  low: "bg-[#cbeef3]",
  medium: "bg-[#fb8500]",
  high: "bg-[#dd2d4a]",
};
const statusColors = {
  active: "bg-[#EF476F]",
  backlog: "bg-[#98A6D4]",
  completed: "bg-[#06D6A0]",
};

const onStatusChange = () => {};
const onPriorityChange = () => {};
const onMarkComplete = () => {};
const TaskDetails = ({ title, priority, status, desc, date }: props) => {
  return (
    <div className="relative grid text-black font-normal bg-white border border-[#9DB5B2] rounded-3xl p-5 max-w-[400px] hover:border-[#FED4E7] hover:border-2 duration-75 ">
      <div className="my-2">
        <StatusLabel status={status} />
      </div>
      <div className="text-xl font-bold mb-2">{title}</div>
      <div className="flex items-center justify-start gap-2 ">
        <div className="font-medium text-slate-500">{desc} </div>
      </div>
      <div className="flex items-center justify-between gap-4 mb-2 text-sm ">
        <div className="font-medium text-slate-500 grid">
          <div>Created : {date}</div>
          <div>Deadline: None</div>
        </div>
        <div className="px-2">
          <button onClick={onStatusChange}>
            <PriorityLabel priority={priority} />
          </button>
        </div>
      </div>

      <div className="h-[1.5px] bg-[#9DB5B2]/60 rounded-full" />
      <div className={`flex items-center justify-between mt-3 `}>
        <div className={`font-medium text-slate-500 `}>Subtasks : 0/3</div>
        <div className="font-medium text-slate-500">completed :</div>
      </div>
    </div>
  );
};

export default TaskDetails;
