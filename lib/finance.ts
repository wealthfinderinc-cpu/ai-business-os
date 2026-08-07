// lib/finance.ts

export function calculateGST(
  amount: number,
  gst: number
) {
  return Number(((amount * gst) / 100).toFixed(2));
}

export function calculateTotal(
  subtotal: number,
  gst: number,
  discount = 0
) {
  return subtotal + gst - discount;
}

export function profit(
  sellingPrice: number,
  costPrice: number
) {
  return Number(
    (sellingPrice - costPrice).toFixed(2)
  );
}

export function profitPercentage(
  sellingPrice: number,
  costPrice: number
) {
  if (costPrice === 0) return 0;

  return Number(
    (
      ((sellingPrice - costPrice) /
        costPrice) *
      100
    ).toFixed(2)
  );
}