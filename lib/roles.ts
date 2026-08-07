export const Roles = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  SALES: "SALES",
  VIEWER: "VIEWER",
} as const;

export function isAdmin(role?: string) {
  return role === Roles.ADMIN;
}

export function isManager(role?: string) {
  return (
    role === Roles.ADMIN ||
    role === Roles.MANAGER
  );
}

export function isSales(role?: string) {
  return (
    role === Roles.ADMIN ||
    role === Roles.MANAGER ||
    role === Roles.SALES
  );
}