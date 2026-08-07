// lib/constants.ts

export const APP_NAME = "AI Business OS";

export const APP_VERSION = "1.0.0";

export const DEFAULT_PAGE_SIZE = 10;

export const MAX_PAGE_SIZE = 100;

export const CURRENCY = "INR";

export const DATE_FORMAT = "dd MMM yyyy";

export const DATETIME_FORMAT = "dd MMM yyyy hh:mm a";


// ==============================
// User Roles
// ==============================

export const USER_ROLES = [
  "ADMIN",
  "MANAGER",
  "SALES",
  "HR",
  "ACCOUNTANT",
  "MARKETING",
  "VIEWER",
] as const;


// ==============================
// Lead Status
// ==============================

export const LEAD_STATUS = [
  "NEW",
  "CONTACTED",
  "FOLLOW_UP",
  "QUALIFIED",
  "WON",
  "LOST",
] as const;


// ==============================
// Order Status
// ==============================

export const ORDER_STATUS = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;


// ==============================
// Payment Status
// ==============================

export const PAYMENT_STATUS = [
  "PENDING",
  "PARTIAL",
  "PAID",
] as const;


// ==============================
// Task Status
// ==============================

export const TASK_STATUS = [
  "TODO",
  "IN_PROGRESS",
  "REVIEW",
  "COMPLETED",
] as const;


// ==============================
// Attendance
// ==============================

export const ATTENDANCE_STATUS = [
  "PRESENT",
  "ABSENT",
  "LEAVE",
  "HALF_DAY",
] as const;


// ==============================
// Dashboard Cards
// ==============================

export const DASHBOARD_CARDS = [
  "Customers",
  "Leads",
  "Products",
  "Orders",
  "Revenue",
  "Inventory",
  "Employees",
  "Campaigns",
];


// ==============================
// Navigation
// ==============================

export const SIDEBAR_MENU = [

  {
    title: "Dashboard",
    href: "/dashboard",
  },

  {
    title: "Leads",
    href: "/leads",
  },

  {
    title: "Customers",
    href: "/customers",
  },

  {
    title: "Products",
    href: "/products",
  },

  {
    title: "Orders",
    href: "/orders",
  },

  {
    title: "Inventory",
    href: "/inventory",
  },

  {
    title: "Finance",
    href: "/finance",
  },

  {
    title: "HR",
    href: "/hr",
  },

  {
    title: "Marketing",
    href: "/marketing",
  },

  {
    title: "Tasks",
    href: "/tasks",
  },

  {
    title: "AI",
    href: "/ai",
  },

  {
    title: "Reports",
    href: "/reports",
  },

  {
    title: "Settings",
    href: "/settings",
  },

];


// ==============================
// API Endpoints
// ==============================

export const API = {

  dashboard: "/api/dashboard",

  leads: "/api/leads",

  customers: "/api/customers",

  products: "/api/products",

  orders: "/api/orders",

  inventory: "/api/inventory",

  expenses: "/api/finance/expenses",

  invoices: "/api/finance/invoices",

  payments: "/api/finance/payments",

  marketing: "/api/marketing",

  tasks: "/api/tasks",

};


// ==============================
// Local Storage Keys
// ==============================

export const STORAGE_KEYS = {

  token: "crm_token",

  theme: "crm_theme",

  user: "crm_user",

}