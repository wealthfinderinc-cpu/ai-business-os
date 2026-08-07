import { create } from "zustand";

interface DashboardState {
  refresh: boolean;

  toggleRefresh: () => void;
}

export const useDashboardStore =
  create<DashboardState>((set) => ({
    refresh: false,

    toggleRefresh: () =>
      set((state) => ({
        refresh: !state.refresh,
      })),
  }));