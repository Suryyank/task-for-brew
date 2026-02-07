"use client";

import React, { ReactNode, useState } from "react";
import {
  Pencil,
  Trash2,
  Circle,
  LucideIcon,
  CircleAlert,
  CircleCheckBig,
  CircleEllipsis,
  Hourglass,
  Check,
  AlarmClockMinus,
} from "lucide-react";
import { TaskDoc } from "@/types/NewTaskData";
import { deleteTask } from "@/db/tasks";

const priorityStylesIcon: Record<TaskDoc["priority"], string> = {
  low: "green",
  medium: "orange",
  high: "red",
};

const priorityStylesText: Record<TaskDoc["priority"], string> = {
  low: "text-green-600",
  medium: "text-orange-600",
  high: "text-red-600",
};

const statusStyles: Record<TaskDoc["status"], LucideIcon> = {
  to_do: AlarmClockMinus,
  in_progress: Hourglass,
  done: Check,
};

const statusStylesColors: Record<TaskDoc["status"], string> = {
  to_do: "orange",
  in_progress: "blue",
  done: "green",
};

interface TaskCardProps {
  task: TaskDoc;
  onDataChange?: () => void;
}

export default function TaskCard({ task, onDataChange }: TaskCardProps) {
  const StatusIcon = statusStyles[task.status];

  async function handleDelete() {
    await deleteTask(task.id);
    onDataChange?.();
  }

  return (
    <div className="flex flex-col justify-between text-black items-start bg-fuchsia-700/20 min-w-[350px] max-w-[350px] max-h-[200px] min-h-[200px] rounded-3xl p-4">
      <div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        {task.dueDate && (
          <p className="text-xs text-gray-500 mt-1">
            Due:{new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>

      <div
        className="flex gap-2 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            console.log("edit mode on");
          }}
          className="p-1.5 hover:bg-gray-100 rounded-md"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={handleDelete}
          className="p-1.5 hover:bg-gray-100 rounded-md"
        >
          <Trash2 size={18} className="text-red-500" />
        </button>
      </div>

      <div className="mt-3 text-sm text-gray-700 leading-relaxed transition-all">
        {task.description || (
          <span className="text-gray-400 italic">No description</span>
        )}
      </div>

      <div className="flex items-center justify-center gap-1 mt-4 rounded-4xl bg-gray-300/50">
        <Circle
          size={15}
          fill={priorityStylesIcon[task.priority]}
          stroke="false"
        />
        <p
          className={`text-md font-semibold capitalize ${priorityStylesText[task.priority]}`}
        >
          {task.priority}
        </p>
        <div className="bg-gray-300/50 rounded-full p-2">
          <StatusIcon
            size={15}
            strokeWidth={3}
            stroke={statusStylesColors[task.status]}
          />
        </div>
      </div>
    </div>
  );
}
