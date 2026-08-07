import { create } from "zustand";

interface OrderState {
  selectedOrder: any;

  setSelectedOrder: (order: any) => void;

  clearSelectedOrder: () => void;
}

export const useOrderStore =
  create<OrderState>((set) => ({
    selectedOrder: null,

    setSelectedOrder: (order) =>
      set({
        selectedOrder: order,
      }),

    clearSelectedOrder: () =>
      set({
        selectedOrder: null,
      }),
  }));