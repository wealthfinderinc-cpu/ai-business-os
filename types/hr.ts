export interface Employee {
  id: string;
  firstName: string;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  department?: string | null;
  designation?: string | null;
  joinedAt?: string;
  active?: boolean;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string | null;
  checkOut?: string | null;
  status?: 'present' | 'absent' | 'on-leave' | 'holiday';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'sick' | 'casual' | 'paid' | 'unpaid' | string;
  startDate: string;
  endDate: string;
  reason?: string | null;
  status?: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  period: string;
  gross: number;
  deductions?: number;
  net: number;
  status?: 'draft' | 'paid' | 'failed';
  paidAt?: string | null;
}

export interface Department {
  id: string;
  name: string;
  managerId?: string | null;
}

export interface Candidate {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  position: string;
  status?: 'applied' | 'interview' | 'offered' | 'hired' | 'rejected';
  appliedAt?: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId?: string | null;
  period: string;
  score?: number;
  comments?: string | null;
  createdAt?: string;
}
