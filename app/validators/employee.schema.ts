import { z } from "zod";

export const employeeSchema = z.object({
  employeeCode: z.string(),

  fullName: z
    .string()
    .min(3, "Employee Name Required"),

  email: z
    .string()
    .email()
    .optional()
    .or(z.literal("")),

  mobile: z.string().optional(),

  designation: z.string().optional(),

  departmentId: z.coerce
    .number()
    .optional(),

  salary: z.coerce
    .number()
    .optional(),
});

export type EmployeeFormData =
  z.infer<typeof employeeSchema>;