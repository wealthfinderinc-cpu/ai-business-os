import { api } from "@/lib/api";
import {
  Employee,
  Attendance,
  Department,
} from "@/types";

export const HRService = {

  getEmployees() {
    return api.get<Employee[]>(
      "/api/hr/employees"
    );
  },

  getEmployee(id: number) {
    return api.get<Employee>(
      `/api/hr/employees/${id}`
    );
  },

  createEmployee(data: any) {
    return api.post(
      "/api/hr/employees",
      data
    );
  },

  updateEmployee(
    id: number,
    data: any
  ) {
    return api.put(
      `/api/hr/employees/${id}`,
      data
    );
  },

  deleteEmployee(id: number) {
    return api.delete(
      `/api/hr/employees/${id}`
    );
  },

  getAttendance() {
    return api.get<Attendance[]>(
      "/api/hr/attendance"
    );
  },

  getDepartments() {
    return api.get<Department[]>(
      "/api/hr/departments"
    );
  },

};