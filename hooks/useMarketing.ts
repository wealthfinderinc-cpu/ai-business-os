"use client";

import { useQuery } from "@tanstack/react-query";
import { MarketingService } from "@/services/marketing.service";

export function useMarketing() {
  return useQuery({
    queryKey: ["marketing"],
    queryFn: MarketingService.getCampaigns,
  });
}