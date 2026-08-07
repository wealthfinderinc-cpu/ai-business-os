import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Task Title Required"),

  description: z.string().optional(),

  priority: z.string(),

  status: z.string(),

  dueDate: z.string().optional(),
});

export type TaskFormData =
  z.infer<typeof taskSchema>;