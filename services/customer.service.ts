import { api } from "@/lib/api";
import { Customer } from "@/types";

export const CustomerService = {
  getAll: () =>
    api.get<Customer[]>("/customers"),

  getById: (id: number) =>
    api.get<Customer>(`/customers/${id}`),

  create: (data: Partial<Customer>) =>
    api.post<Customer>("/customers", data),

  update: (
    id: number,
    data: Partial<Customer>
  ) =>
    api.put<Customer>(
      `/customers/${id}`,
      data
    ),

  delete: (id: number) =>
    api.delete<void>(
      `/customers/${id}`
    ),
};