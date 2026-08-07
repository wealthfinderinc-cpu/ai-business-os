"use client";

import { useQuery } from "@tanstack/react-query";
import { InventoryService } from "@/services/inventory.service";

export function useInventory() {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: () => InventoryService.getAll(),
  });
}