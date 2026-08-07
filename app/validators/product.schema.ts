import { z } from "zod";

export const productSchema = z.object({
  productCode: z
    .string()
    .min(2, "Product Code Required"),

  name: z
    .string()
    .min(2, "Product Name Required"),

  category: z
    .string()
    .min(2, "Category Required"),

  brand: z.string().optional(),

  description: z.string().optional(),

  mrp: z.coerce.number().positive(),

  dp: z.coerce.number().positive(),

  gst: z.coerce.number().min(0),

  stock: z.coerce.number().min(0),

  minStock: z.coerce.number().min(0),
});

export type ProductFormData =
  z.infer<typeof productSchema>;