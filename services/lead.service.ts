import { api } from "@/lib/api";
import { Lead } from "@/types";

export const LeadService = {
  getAll: async (): Promise<Lead[]> => {
    return await api.get<Lead[]>("/leads");
  },

  getById: async (id: number): Promise<Lead> => {
    return await api.get<Lead>(`/leads/${id}`);
  },

  create: async (data: Partial<Lead>): Promise<Lead> => {
    return await api.post<Lead>("/leads", data);
  },

  update: async (id: number, data: Partial<Lead>): Promise<Lead> => {
    return await api.put<Lead>(`/leads/${id}`, data);
  },

  delete: async (id: number): Promise<void> => {
    return await api.delete<void>(`/leads/${id}`);
  },
};
