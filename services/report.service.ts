import { api } from "@/lib/api";

export const ReportService = {

  sales() {
    return api.get(
      "/api/reports/sales"
    );
  },

  customers() {
    return api.get(
      "/api/reports/customers"
    );
  },

  products() {
    return api.get(
      "/api/reports/products"
    );
  },

  orders() {
    return api.get(
      "/api/reports/orders"
    );
  },

  finance() {
    return api.get(
      "/api/reports/finance"
    );
  },

};