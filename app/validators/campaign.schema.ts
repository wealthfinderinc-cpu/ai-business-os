import { z } from "zod";

export const campaignSchema = z.object({
  name: z
    .string()
    .min(3, "Campaign Name Required"),

  type: z.string(),

  audience: z.string().optional(),

  budget: z.coerce
    .number()
    .optional(),

  status: z.string(),

  startDate: z.string().optional(),

  endDate: z.string().optional(),
});

export type CampaignFormData =
  z.infer<typeof campaignSchema>;