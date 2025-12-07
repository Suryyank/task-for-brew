"use client";

import { useState } from "react";
import SelectBox from "../atoms/SelectBox";
import { createTask } from "@/lib/tasks";

export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "to_do" | "in_progress" | "done";

export interface NewTaskData {
  title: string;
  description?: string;
  dueDate?: string;
  priority: TaskPriority;
  status: TaskStatus;
}
export interface TaskDoc extends NewTaskData {
  id: string;
  userId: string;
}

export function NewTask() {
  const [form, setForm] = useState<NewTaskData>({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "to_do",
  });

  const [errors, setErrors] = useState<{ title?: string }>({});
  // const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  // const [status, setStatus] = useState<"to_do" | "in_progress" | "done">(
  //   "to_do"
  // );

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // validation
    let newErrors: { title?: string } = {};
    if (!form.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // prepare data
    const dataToSave = form;

    console.log("Submitting Task:", dataToSave);

    try {
      await createTask(dataToSave);
      alert("Task created!");

      // reset form
      setForm({
        title: "",
        description: "",
        dueDate: "",
        priority: "low",
        status: "to_do",
      });
    } catch (err) {
      console.error(err);
      alert("Error creating task!");
    }
  }

  return (
    <form className="max-w-lg mx-auto p-6 bg-white shadow-2xl rounded-xl space-y-5 text-black">
      <h2 className="text-2xl font-bold">Create New Task</h2>

      {/* Title */}
      <div>
        <label className="block mb-1 font-extrabold">Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-lg px-3 py-2 ring-2 ring-gray-400/20 hover:ring-blue-400 duration-150"
          placeholder="Enter task title"
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-extrabold">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full ring-2 ring-gray-400/20 hover:ring-blue-400 duration-150 rounded-lg px-3 py-2"
          rows={3}
          placeholder="Task details (optional)"
        />
      </div>

      {/* Due Date */}
      <div>
        <label className="block mb-1 font-extrabold">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full ring-2 ring-gray-400/20 hover:ring-blue-400 duration-150 rounded-lg px-3 py-2"
          placeholder="date"
        />
      </div>

      {/* Priority */}
      <div>
        <label className="block mb-5 font-extrabold">Priority</label>
        <div className="flex gap-4 items-center">
          <SelectBox
            title="Low"
            selected={form.priority === "low"}
            onSelect={() =>
              setForm((prev) => ({
                ...prev,
                priority: "low",
              }))
            }
          />
          <SelectBox
            title="Medium"
            selected={form.priority === "medium"}
            onSelect={() =>
              setForm((prev) => ({
                ...prev,
                priority: "medium",
              }))
            }
          />
          <SelectBox
            title="High"
            selected={form.priority === "high"}
            onSelect={() =>
              setForm((prev) => ({
                ...prev,
                priority: "high",
              }))
            }
          />
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block mb-3 font-extrabold">Priority</label>
        <div className="flex max-md:grid gap-4 items-center">
          <SelectBox
            title="To-Do"
            selected={form.status === "to_do"}
            onSelect={() =>
              setForm((prev) => ({
                ...prev,
                status: "to_do",
              }))
            }
          />
          <SelectBox
            title="In Progress"
            selected={form.status === "in_progress"}
            onSelect={() =>
              setForm((prev) => ({
                ...prev,
                status: "in_progress",
              }))
            }
          />
          <SelectBox
            title="Done"
            selected={form.status === "done"}
            onSelect={() =>
              setForm((prev) => ({
                ...prev,
                status: "done",
              }))
            }
          />
        </div>
      </div>

      <button
        type="button"
        className="w-full bg-[#db452b] text-white py-2 rounded-xl font-semibold hover:bg-[#db452b]/80 transition"
        onClick={handleSubmit}
      >
        Create Task
      </button>
    </form>
  );
}
