export interface Lead {
  id: number;
  fullName: string;
  mobile: string;
  email?: string | null;
  city?: string | null;
  source?: string | null;
  status: string;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}