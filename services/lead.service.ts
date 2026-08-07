import { api } from "@/lib/api";
import { Lead } from "@/types";

export const LeadService = {
  getAll: () =>
    api.get<Lead[]>("/leads"),

  getById: (id: number) =>
    api.get<Lead>(`/leads/${id}`),

  create: (data: Partial<Lead>) =>
    api.post<Lead>("/leads", data),

  update: (
    id: number,
    data: Partial<Lead>
  ) =>
    api.put<Lead>(
      `/leads/${id}`,
      data
    ),

  delete: (id: number) =>
    api.delete<void>(
      `/leads/${id}`
    ),
};