import { create } from "zustand";

interface ProductState {
  selectedProduct: any;

  setSelectedProduct: (product: any) => void;
}

export const useProductStore =
  create<ProductState>((set) => ({
    selectedProduct: null,

    setSelectedProduct: (product) =>
      set({
        selectedProduct: product,
      }),
  }));