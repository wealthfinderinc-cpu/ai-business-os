import { api } from '@/lib/api';
import { Income, Expense, Invoice, Payment, GSTReport, ProfitLoss, CashFlow } from '@/types/finance';

export const FinanceService = {
  async listIncome(): Promise<Income[]> { return api.get('/finance/income'); },
  async createIncome(data: Partial<Income>) { return api.post('/finance/income', data); },

  async listExpense(): Promise<Expense[]> { return api.get('/finance/expense'); },
  async createExpense(data: Partial<Expense>) { return api.post('/finance/expense', data); },

  async listInvoices(): Promise<Invoice[]> { return api.get('/finance/invoices'); },
  async createInvoice(data: Partial<Invoice>) { return api.post('/finance/invoices', data); },

  async listPayments(): Promise<Payment[]> { return api.get('/finance/payments'); },
  async createPayment(data: Partial<Payment>) { return api.post('/finance/payments', data); },

  async getGST(period?: string): Promise<GSTReport> { return api.get(`/finance/reports/gst${period ? '?period='+encodeURIComponent(period) : ''}`); },
  async getProfitLoss(period?: string): Promise<ProfitLoss> { return api.get(`/finance/reports/profit-loss${period ? '?period='+encodeURIComponent(period) : ''}`); },
  async getCashFlow(period?: string): Promise<CashFlow> { return api.get(`/finance/reports/cash-flow${period ? '?period='+encodeURIComponent(period) : ''}`); },

  // Export endpoints
  async exportExcel(type: string, params?: Record<string,string>) { return api.post(`/finance/export/${type}`, params || {}); },
  async exportPdf(type: string, params?: Record<string,string>) { return api.post(`/finance/export/${type}/pdf`, params || {}); }
};
