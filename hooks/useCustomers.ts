"use client";

import { useQuery } from "@tanstack/react-query";
import { CustomerService } from "@/services/customer.service";

export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => CustomerService.getAll(),
  });
}