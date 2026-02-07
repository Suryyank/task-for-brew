export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "backlog" | "planned" | "completed";

export interface NewTaskData {
  title: string;
  description?: string;
  dueDate?: Date;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface TaskDoc extends NewTaskData {
  id: string;
  userId: string;
}
