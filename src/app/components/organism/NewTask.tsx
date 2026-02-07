"use client";

import { useState } from "react";
import SelectBox from "../atoms/SelectBox";
import { createTask } from "@/db/tasks";

import { useModalContext } from "@/context/ModalStateContext";
import {
  XCircle,
  Siren,
  Sprout,
  Orbit,
  NotebookPen,
  Notebook,
} from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { NewTaskFormValues } from "@/schema/FormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newTaskSchema } from "@/schema/FormSchema";
import CustomButton from "../atoms/CustomButton";

export function NewTask() {
  const form = useForm<NewTaskFormValues>({
    resolver: zodResolver(newTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: undefined,
      priority: "low",
      status: "backlog",
    },
  });

  const priority = form.watch("priority");
  const status = form.watch("status");

  const modelcontext = useModalContext();

  const handleModalState = () => {
    modelcontext.setModalState(false);
  };

  const onSubmit = async (data: NewTaskFormValues) => {
    try {
      const payload = {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      };

      await createTask(payload);
      alert("Task Created");

      console.log("FORM Submit");
      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Failed to create task");
    }
  };

  const priorityToSlider = (priority: string) => {
    switch (priority) {
      case "low":
        return 0;
      case "medium":
        return 1;
      case "high":
        return 2;
      default:
        return 0;
    }
  };

  const sliderToPriority = (value: number) => {
    switch (value) {
      case 0:
        return "low";
      case 1:
        return "medium";
      case 2:
        return "high";
      default:
        return "low";
    }
  };

  const statusToSlider = (status: string) => {
    switch (status) {
      case "backlog":
        return 0;
      case "planned":
        return 1;
      case "completed":
        return 2;
      default:
        return 1;
    }
  };

  const sliderToStatus = (val: number) => {
    switch (val) {
      case 0:
        return "backlog";
      case 1:
        return "planned";
      case 2:
        return "completed";
      default:
        return "planned";
    }
  };

  return (
    <div className="fixed border border-black w-full h-full left-0 top-0 right-0 bottom-0 bg-slate-400/20 z-50 backdrop-blur-xs">
      <div className="flex item-center justify-center w-full my-30 bg-amber-300/0">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-auto mx-auto p-6 bg-white shadow-2xl rounded-xl space-y-5 text-black"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarCheck
                stroke="#2EC4B6"
                strokeWidth={2.1}
                size={28}
                className="-mt-0.5"
              />
              <h2 className={`text-2xl font-bold $`}>Create New Task</h2>
            </div>
            {modelcontext.modalState && (
              <button onClick={handleModalState}>
                <XCircle
                  className="text-red-500 hover:text-red-600 transition-colors"
                  strokeWidth={2.4}
                  size={28}
                />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2">
            {/* Title */}
            <div className="">
              <label className="block mb-1 font-extrabold">Title *</label>
              <input
                {...form.register("title")}
                className="w-full rounded-lg px-3 py-2 ring-2 ring-gray-400/20 hover:ring-blue-400 duration-150"
                placeholder="Enter task title"
              />
              {form.formState.errors.title?.message}

              {/* Due Date */}
              <div>
                <label className="block mb-1 font-extrabold">Due Date</label>
                <input
                  type="date"
                  {...form.register("dueDate")}
                  className="w-full ring-2 ring-gray-400/20 hover:ring-blue-400 duration-150 rounded-lg px-3 py-2"
                  placeholder="date"
                />
              </div>
            </div>
            {/* Description */}
            <div>
              <label className="block mb-1 font-extrabold">Description</label>
              <textarea
                {...form.register("description")}
                className="w-full ring-2 ring-gray-400/20 hover:ring-blue-400 duration-150 rounded-lg px-3 py-2"
                rows={3}
                placeholder="Task details (optional)"
              />
            </div>

            {/* Priority */}
            {/* <div className="sm:flex grid items-center gap-5 px-4 bg-amber-500/0"> */}
            <div className="grid gap-8">
              <div className="w-full max-w-xs">
                <label className="block mb-1 font-extrabold">Priority</label>
                <input
                  type="range"
                  min={0}
                  max={2}
                  step={1}
                  value={priorityToSlider(priority)}
                  onChange={(e) =>
                    form.setValue(
                      "priority",
                      sliderToPriority(Number(e.target.value)),
                      { shouldDirty: true, shouldValidate: true },
                    )
                  }
                  className="range [--range-bg:#ebebeb] [--range-thumb:brown] [--range-thumb-size:18px] slider-no-border [--range-fill:0] range-sm"
                />
                <div className="max-sm:hidden flex justify-between px-2.5 font-extrabold text-[#cfcdcd]">
                  <span>|</span>
                  <span>|</span>
                  <span>|</span>
                </div>

                <div className="flex justify-between px-2.5 font-bold text-[18px]">
                  <span className="text-[#6BCB77]  ">Low</span>
                  <span className="text-[#FFD93D] ">Medium</span>
                  <span className="text-[#FF6B6B] ">High</span>
                </div>
              </div>
              {/* <div className="h-[200px] w-[2px] rounded-full bg-slate-500/30" /> */}

              {/* Status */}
              <div className="w-full max-w-xs">
                <label className="block mb-1 font-extrabold">Status</label>
                <input
                  type="range"
                  min={0}
                  max={2}
                  step={1}
                  value={statusToSlider(status)}
                  onChange={(e) =>
                    form.setValue(
                      "status",
                      sliderToStatus(Number(e.target.value)),
                      { shouldDirty: true, shouldValidate: true },
                    )
                  }
                  className="range [--range-bg:#ebebeb] [--range-thumb:brown] [--range-thumb-size:18px] slider-no-border [--range-fill:0] range-sm"
                />
                <div className="max-sm:hidden flex justify-between px-2.5 font-extrabold text-[#cfcdcd]">
                  <span>|</span>
                  <span>|</span>
                  <span>|</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <button
                    className="bg-amber-400/0 pr-5"
                    onClick={() => {
                      form.setValue("status", "backlog");
                    }}
                  >
                    <Siren size={28} stroke="red" />
                  </button>

                  <button
                    className="px-5 bg-amber-400/0"
                    onClick={() => {
                      form.setValue("status", "planned");
                    }}
                  >
                    <Notebook size={26} stroke="darkblue" />
                  </button>

                  <button
                    className="pl-5 bg-amber-400/0"
                    onClick={() => {
                      form.setValue("status", "completed");
                    }}
                  >
                    <Sprout size={28} stroke="green" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <CustomButton
            title="Add Task"
            type="submit"
            className="w-full text-white hover:scale-102 duration-170"
          />
        </form>
      </div>
    </div>
  );
}
