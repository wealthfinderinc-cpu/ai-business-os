export interface Task {
  id: number;

  title: string;

  description?: string;

  priority: string;

  status: string;

  dueDate?: string;

  userId?: number;

  createdAt: string;

  updatedAt: string;
}

export interface TaskForm {
  title: string;

  description?: string;

  priority: string;

  status?: string;

  dueDate?: string;

  userId?: number;
}