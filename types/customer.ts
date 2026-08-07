export interface Customer {
  id: number;
  customerId: string;

  fullName: string;

  mobile: string;

  email?: string;

  city?: string;

  state?: string;

  address?: string;

  active: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface CustomerForm {
  fullName: string;
  mobile: string;
  email?: string;
  city?: string;
  state?: string;
  address?: string;
}