import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;

  loading: boolean;

  setSidebarOpen: (
    value: boolean
  ) => void;

  setLoading: (
    value: boolean
  ) => void;
}

export const useUIStore =
  create<UIState>((set) => ({
    sidebarOpen: true,

    loading: false,

    setSidebarOpen: (value) =>
      set({
        sidebarOpen: value,
      }),

    setLoading: (value) =>
      set({
        loading: value,
      }),
  }));