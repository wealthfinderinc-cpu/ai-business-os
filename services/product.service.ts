import { api } from "@/lib/api";
import { Product } from "@/types";

export const ProductService = {
  getAll: () =>
    api.get<Product[]>("/products"),

  getById: (id: number) =>
    api.get<Product>(`/products/${id}`),

  create: (data: Partial<Product>) =>
    api.post<Product>("/products", data),

  update: (
    id: number,
    data: Partial<Product>
  ) =>
    api.put<Product>(
      `/products/${id}`,
      data
    ),

  delete: (id: number) =>
    api.delete<void>(
      `/products/${id}`
    ),
};