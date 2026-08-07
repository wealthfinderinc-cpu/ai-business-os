import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email Required"),

  password: z
    .string()
    .min(6, "Minimum 6 Characters"),
});

export type LoginFormData =
  z.infer<typeof loginSchema>;