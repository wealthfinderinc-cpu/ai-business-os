import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().min(3, "Full Name is required"),
  mobile: z.string().min(10).max(10),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;