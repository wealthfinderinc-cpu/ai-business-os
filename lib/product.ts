// lib/product.ts

export function calculateDP(mrp: number) {
  return +(mrp * 0.75).toFixed(2);
}

export function lowStock(
  stock: number,
  minimum: number
) {
  return stock <= minimum;
}

export function stockValue(
  stock: number,
  dp: number
) {
  return +(stock * dp).toFixed(2);
}