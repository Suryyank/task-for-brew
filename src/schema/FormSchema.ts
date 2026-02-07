// schema/FormSchema.ts
import { z } from "zod";

export const newTaskSchema = z.object({
  title: z.string().min(1, "Title is Required"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["backlog", "planned", "completed"]),
});

export type NewTaskFormValues = z.infer<typeof newTaskSchema>;
