export interface DashboardStats {
  customers: number;

  leads: number;

  products: number;

  orders: number;

  revenue: number;

  expenses: number;

  employees: number;

  campaigns: number;
}

export interface DashboardChart {
  label: string;

  value: number;
}