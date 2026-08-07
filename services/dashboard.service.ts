import { api } from "@/lib/api";
import { DashboardStats } from "@/types";

export const DashboardService = {

  stats() {
    return api.get<DashboardStats>(
      "/api/dashboard"
    );
  },

  charts() {
    return api.get(
      "/api/dashboard/charts"
    );
  },

};