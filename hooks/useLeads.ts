"use client";

import { useQuery } from "@tanstack/react-query";
import { LeadService } from "@/services/lead.service";

export function useLeads() {
  return useQuery({
    queryKey: ["leads"],
    queryFn: () => LeadService.getAll(),
  });
}