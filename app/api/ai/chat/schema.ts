import { z } from "zod";

export const AIChatSchema = z.object({

  prompt: z
    .string()
    .min(1)
    .max(10000),

});

export type AIChatInput =
  z.infer<
    typeof AIChatSchema
  >;