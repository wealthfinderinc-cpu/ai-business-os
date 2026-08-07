import { api } from "@/lib/api";
import { Task } from "@/types";

export const TaskService = {

  getAll() {
    return api.get<Task[]>(
      "/api/tasks"
    );
  },

  getById(id: number) {
    return api.get<Task>(
      `/api/tasks/${id}`
    );
  },

  create(data: any) {
    return api.post(
      "/api/tasks",
      data
    );
  },

  update(
    id: number,
    data: any
  ) {
    return api.put(
      `/api/tasks/${id}`,
      data
    );
  },

  delete(id: number) {
    return api.delete(
      `/api/tasks/${id}`
    );
  },

};