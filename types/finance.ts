export interface Income {
  id: string;
  date: string;
  account?: string | null;
  amount: number;
  category?: string | null;
  description?: string | null;
  invoiceId?: string | null;
  createdAt?: string;
}

export interface Expense {
  id: string;
  date: string;
  account?: string | null;
  amount: number;
  category?: string | null;
  vendor?: string | null;
  description?: string | null;
  createdAt?: string;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate?: string | null;
  customer?: string | null;
  items?: { description: string; qty: number; rate: number; amount: number }[];
  subtotal?: number;
  tax?: number;
  total?: number;
  status?: 'draft' | 'sent' | 'paid' | 'overdue';
  createdAt?: string;
}

export interface Payment {
  id: string;
  invoiceId?: string | null;
  date: string;
  amount: number;
  method?: string | null;
  reference?: string | null;
  createdAt?: string;
}

export interface GSTReport {
  period: string;
  outputTax: number;
  inputTax: number;
  payable: number;
}

export interface ProfitLoss {
  period: string;
  revenue: number;
  costOfGoodsSold?: number;
  expenses: number;
  netProfit: number;
}

export interface CashFlow {
  period: string;
  opening: number;
  inflows: number;
  outflows: number;
  closing: number;
}
