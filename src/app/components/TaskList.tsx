"use client";

import React, { useState, useEffect } from "react";
import TaskCard from "./molecule/TaskCard";
import { getTasksForUser } from "@/db/tasks";
import { TaskDoc } from "./organism/NewTask";
import { auth } from "@/db/firebaseContext";
import { onAuthStateChanged } from "firebase/auth";

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskDoc[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserId(null);
        setTasks([]);
        return;
      }

      setUserId(user.uid);

      const data = await getTasksForUser(user.uid);
      setTasks(data as TaskDoc[]);
    });

    return () => unsub();
  }, []);

  // Central refresh function
  const refreshTasks = async () => {
    if (!userId) return;

    const data = await getTasksForUser(userId);
    setTasks(data as TaskDoc[]);
  };

  const highPriority = tasks.filter((t) => t.priority === "high");
  const mediumPriority = tasks.filter((t) => t.priority === "medium");
  const lowPriority = tasks.filter((t) => t.priority === "low");

  return (
    <div className="mt-20 grid">
      {/* HIGH */}
      <div className="mx-10">
        <h1 className="text-red-500 font-semibold">High</h1>
        <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {highPriority.map((task) => (
            <TaskCard key={task.id} task={task} onDataChange={refreshTasks} />
          ))}
        </div>
      </div>

      {/* MEDIUM */}
      <div className="mx-10">
        <h1 className="text-yellow-400 font-semibold">Medium</h1>
        <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {mediumPriority.map((task) => (
            <TaskCard key={task.id} task={task} onDataChange={refreshTasks} />
          ))}
        </div>
      </div>

      {/* LOW */}
      <div className="mx-10">
        <h1 className="text-green-500 font-semibold">Low</h1>
        <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {lowPriority.map((task) => (
            <TaskCard key={task.id} task={task} onDataChange={refreshTasks} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
