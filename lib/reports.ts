// lib/reports.ts

export function totalRevenue(
  orders: any[]
) {
  return orders.reduce(
    (sum, order) => sum + order.total,
    0
  );
}

export function totalCustomers(
  customers: any[]
) {
  return customers.length;
}

export function totalProducts(
  products: any[]
) {
  return products.length;
}

export function totalOrders(
  orders: any[]
) {
  return orders.length;
}