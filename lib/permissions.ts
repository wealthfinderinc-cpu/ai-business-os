// lib/permissions.ts

export const Permissions = {

  ADMIN: [
    "*",
  ],

  MANAGER: [
    "dashboard",
    "customers",
    "products",
    "orders",
    "inventory",
    "finance",
    "marketing",
    "tasks",
    "reports",
  ],

  SALES: [
    "dashboard",
    "customers",
    "leads",
    "orders",
    "products",
  ],

  HR: [
    "dashboard",
    "employees",
    "attendance",
  ],

  ACCOUNTANT: [
    "dashboard",
    "finance",
    "reports",
  ],

  MARKETING: [
    "dashboard",
    "marketing",
    "campaigns",
  ],

  VIEWER: [
    "dashboard",
  ],

};

export function hasPermission(
  role: string,
  permission: string
) {
  const list =
    Permissions[
      role as keyof typeof Permissions
    ] || [];

  return (
    list.includes("*") ||
    list.includes(permission)
  );
}