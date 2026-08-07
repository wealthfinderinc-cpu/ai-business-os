// lib/order.ts

export function subtotal(items: any[]) {
  return items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );
}

export function tax(
  amount: number,
  gst: number
) {
  return +(amount * gst / 100).toFixed(2);
}

export function grandTotal(
  subtotal: number,
  gst: number,
  discount: number
) {
  return subtotal + gst - discount;
}