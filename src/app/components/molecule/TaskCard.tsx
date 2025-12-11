"use client";

import React, { useState } from "react";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { TaskDoc } from "../organism/NewTask";
import { updateTask, deleteTask } from "@/db/tasks";

const priorityStyles: Record<TaskDoc["priority"], string> = {
  low: "bg-emerald-100 text-emerald-700 border-emerald-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  high: "bg-rose-100 text-rose-700 border-rose-200",
};

const statusStyles: Record<TaskDoc["status"], string> = {
  to_do: "bg-gray-100 text-gray-700 border-gray-300",
  in_progress: "bg-blue-100 text-blue-700 border-blue-200",
  done: "bg-green-100 text-green-700 border-green-200",
};

interface TaskCardProps {
  task: TaskDoc;
  onDataChange?: () => void;
}

export default function TaskCard({ task, onDataChange }: TaskCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description ?? "",
    priority: task.priority,
    status: task.status,
  });

  async function handleDelete() {
    await deleteTask(task.id);
    onDataChange?.();
  }

  async function handleSave() {
    await updateTask(task.id, editForm);
    setEditing(false);
    onDataChange?.();
  }

  return (
    <div
      onClick={() => !editing && setExpanded((prev) => !prev)}
      className={`
        p-5 rounded-2xl border bg-white shadow-sm hover:shadow-lg
        transition-all duration-300 cursor-pointer group relative

        ${
          editing
            ? "h-auto overflow-visible"
            : expanded
            ? "h-auto"
            : "h-[200px] overflow-hidden"
        }
      `}
    >
      {/* === Edit Overlay === */}
      {editing && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="
      absolute inset-0 bg-white/95 backdrop-blur-md p-4 rounded-2xl
      flex flex-col gap-4 z-20
      max-h-[600px] overflow-y-auto
    "
        >
          {/* TITLE */}
          <input
            className="w-full px-3 py-2 border rounded-md"
            value={editForm.title}
            onChange={(e) =>
              setEditForm((p) => ({ ...p, title: e.target.value }))
            }
          />

          {/* DESCRIPTION */}
          <textarea
            className="w-full px-3 py-2 border rounded-md min-h-[120px] resize-y"
            rows={5}
            value={editForm.description}
            onChange={(e) =>
              setEditForm((p) => ({ ...p, description: e.target.value }))
            }
          />

          {/* PRIORITY */}
          <label className="text-sm font-medium">Priority</label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={editForm.priority}
            onChange={(e) =>
              setEditForm((p) => ({
                ...p,
                priority: e.target.value as TaskDoc["priority"],
              }))
            }
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* STATUS */}
          <label className="text-sm font-medium mt-1">Status</label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={editForm.status}
            onChange={(e) =>
              setEditForm((p) => ({
                ...p,
                status: e.target.value as TaskDoc["status"],
              }))
            }
          >
            <option value="to_do">To-Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          {/* BUTTONS */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setEditing(false)}
              className="p-2 rounded-md hover:bg-gray-200"
            >
              <X size={18} />
            </button>
            <button
              onClick={handleSave}
              className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              <Check size={18} />
            </button>
          </div>
        </div>
      )}

      {/* === TOP ROW === */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          {task.dueDate && (
            <p className="text-xs text-gray-500 mt-1">Due: {task.dueDate}</p>
          )}
        </div>

        <div
          className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setEditing(true)}
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
      </div>

      {/* === DESCRIPTION === */}
      <div
        className={`
          mt-3 text-sm text-gray-700 leading-relaxed transition-all
          ${expanded ? "line-clamp-none" : "line-clamp-3"}
        `}
      >
        {task.description || (
          <span className="text-gray-400 italic">No description</span>
        )}
      </div>

      {/* === Badges === */}
      <div className="flex gap-3 mt-4">
        <span
          className={`px-3 py-1 text-xs border rounded-md ${
            priorityStyles[task.priority]
          }`}
        >
          {task.priority.toUpperCase()}
        </span>

        <span
          className={`px-3 py-1 text-xs border rounded-md ${
            statusStyles[task.status]
          }`}
        >
          {task.status.replace("_", " ").toUpperCase()}
        </span>
      </div>
    </div>
  );
}
