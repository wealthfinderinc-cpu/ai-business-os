import { z } from "zod";

export const orderSchema = z.object({
  customerId: z.coerce.number(),

  subtotal: z.coerce.number(),

  tax: z.coerce.number(),

  discount: z.coerce.number(),

  total: z.coerce.number(),

  paymentStatus: z.string(),

  status: z.string(),
});

export type OrderFormData =
  z.infer<typeof orderSchema>;