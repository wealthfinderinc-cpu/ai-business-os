import { api } from "@/lib/api";
import { Order } from "@/types";

export const OrderService = {
  getAll: () =>
    api.get<Order[]>("/orders"),

  getById: (id: number) =>
    api.get<Order>(`/orders/${id}`),

  create: (data: Partial<Order>) =>
    api.post<Order>("/orders", data),

  update: (
    id: number,
    data: Partial<Order>
  ) =>
    api.put<Order>(
      `/orders/${id}`,
      data
    ),

  delete: (id: number) =>
    api.delete<void>(
      `/orders/${id}`
    ),
};