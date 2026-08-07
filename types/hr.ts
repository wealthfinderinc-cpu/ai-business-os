export interface Employee {
  id: number;

  employeeCode: string;

  fullName: string;

  email?: string;

  mobile?: string;

  designation?: string;

  departmentId?: number;

  salary?: number;

  active: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface Department {
  id: number;

  name: string;

  description?: string;
}

export interface Attendance {
  id: number;

  employeeId: number;

  date: string;

  status: string;
}