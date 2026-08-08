import { z } from "zod";

export const ExpenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number().min(0, "Amount must be a non-negative number"),
  category: z.string().min(1, "Category is required"),
  date: z.preprocess((val) => {
    // Accept ISO date strings or Date objects and normalize to Date
    if (typeof val === "string" || val instanceof Date) return new Date(val as any);
    return val;
  }, z.date()),
  notes: z.string().optional().nullable(),
});

export type Expense = z.infer<typeof ExpenseSchema>;
