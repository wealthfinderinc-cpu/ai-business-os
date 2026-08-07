"use client";

import { useQuery } from "@tanstack/react-query";
import { FinanceService } from "@/services/finance.service";

export function useFinance() {
  return useQuery({
    queryKey: ["finance"],
    queryFn: FinanceService.getExpenses,
  });
}