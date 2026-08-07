// lib/customer.ts

export function customerCode(id: number) {
  return `CUS-${id.toString().padStart(5, "0")}`;
}

export function fullAddress(customer: any) {
  return [
    customer.address,
    customer.city,
    customer.state,
  ]
    .filter(Boolean)
    .join(", ");
}