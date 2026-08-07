// lib/inventory.ts

export function isLowStock(
  stock: number,
  minStock: number
) {
  return stock <= minStock;
}

export function stockPercentage(
  stock: number,
  minStock: number
) {
  if (minStock === 0) return 0;

  return Math.round((stock / minStock) * 100);
}

export function inventoryValue(
  stock: number,
  dp: number
) {
  return Number((stock * dp).toFixed(2));
}

export function stockStatus(
  stock: number,
  minStock: number
) {
  if (stock === 0) return "OUT_OF_STOCK";

  if (stock <= minStock) return "LOW_STOCK";

  return "IN_STOCK";
}