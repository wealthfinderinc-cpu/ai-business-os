import { api } from "@/lib/api";
import { Expense, Payment } from "@/types";

export const FinanceService = {

  getExpenses() {
    return api.get<Expense[]>(
      "/api/finance/expenses"
    );
  },

  createExpense(data: any) {
    return api.post(
      "/api/finance/expenses",
      data
    );
  },

  updateExpense(
    id: number,
    data: any
  ) {
    return api.put(
      `/api/finance/expenses/${id}`,
      data
    );
  },

  deleteExpense(id: number) {
    return api.delete(
      `/api/finance/expenses/${id}`
    );
  },

  getPayments() {
    return api.get<Payment[]>(
      "/api/finance/payments"
    );
  },

  createPayment(data: any) {
    return api.post(
      "/api/finance/payments",
      data
    );
  },

  getInvoices() {
    return api.get(
      "/api/finance/invoices"
    );
  },

};