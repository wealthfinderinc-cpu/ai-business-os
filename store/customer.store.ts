import { create } from "zustand";

interface CustomerState {
  selectedCustomer: any;

  setSelectedCustomer: (customer: any) => void;
}

export const useCustomerStore =
  create<CustomerState>((set) => ({
    selectedCustomer: null,

    setSelectedCustomer: (customer) =>
      set({
        selectedCustomer: customer,
      }),
  }));