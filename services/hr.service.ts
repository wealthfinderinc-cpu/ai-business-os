import { api } from '@/lib/api';
import { Employee, AttendanceRecord, LeaveRequest, PayrollRecord, Department, Candidate, PerformanceReview } from '@/types/hr';

export const HRService = {
  // Employees
  listEmployees: async (): Promise<Employee[]> => api.get('/hr/employees'),
  getEmployee: async (id: string): Promise<Employee> => api.get(`/hr/employees/${id}`),
  createEmployee: async (data: Partial<Employee>) => api.post('/hr/employees', data),
  updateEmployee: async (id: string, data: Partial<Employee>) => api.put(`/hr/employees/${id}`, data),

  // Attendance
  listAttendance: async (): Promise<AttendanceRecord[]> => api.get('/hr/attendance'),
  recordAttendance: async (data: Partial<AttendanceRecord>) => api.post('/hr/attendance', data),

  // Leaves
  listLeaves: async (): Promise<LeaveRequest[]> => api.get('/hr/leaves'),
  requestLeave: async (data: Partial<LeaveRequest>) => api.post('/hr/leaves', data),
  updateLeave: async (id: string, data: Partial<LeaveRequest>) => api.put(`/hr/leaves/${id}`, data),

  // Payroll
  listPayroll: async (): Promise<PayrollRecord[]> => api.get('/hr/payroll'),
  createPayroll: async (data: Partial<PayrollRecord>) => api.post('/hr/payroll', data),

  // Departments
  listDepartments: async (): Promise<Department[]> => api.get('/hr/departments'),
  createDepartment: async (data: Partial<Department>) => api.post('/hr/departments', data),

  // Recruitment
  listCandidates: async (): Promise<Candidate[]> => api.get('/hr/candidates'),
  createCandidate: async (data: Partial<Candidate>) => api.post('/hr/candidates', data),

  // Performance
  listReviews: async (): Promise<PerformanceReview[]> => api.get('/hr/reviews'),
  createReview: async (data: Partial<PerformanceReview>) => api.post('/hr/reviews', data),
};
