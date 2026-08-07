import { z } from "zod";

export const customerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full Name is required"),

  mobile: z
    .string()
    .min(10, "Mobile Number is required")
    .max(10, "Invalid Mobile Number"),

  email: z
    .string()
    .email("Invalid Email")
    .optional()
    .or(z.literal("")),

  city: z.string().optional(),

  state: z.string().optional(),

  address: z.string().optional(),
});

export type CustomerFormData =
  z.infer<typeof customerSchema>;