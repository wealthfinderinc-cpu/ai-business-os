import { api } from "@/lib/api";
import { Inventory } from "@/types";

export const InventoryService = {
  getAll: () =>
    api.get<Inventory[]>("/inventory"),

  getById: (id: number) =>
    api.get<Inventory>(
      `/inventory/${id}`
    ),

  update: (
    id: number,
    data: Partial<Inventory>
  ) =>
    api.put<Inventory>(
      `/inventory/${id}`,
      data
    ),
};