import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format Currency
 */
export function formatCurrency(
  amount: number,
  currency: string = "INR"
) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format Date
 */
export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Format Date & Time
 */
export function formatDateTime(date: Date | string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

/**
 * Generate Random Code
 */
export function generateCode(prefix: string) {
  return `${prefix}-${Date.now()}`;
}

/**
 * Generate Lead ID
 */
export function generateLeadId() {
  return generateCode("LD");
}

/**
 * Generate Customer ID
 */
export function generateCustomerId() {
  return generateCode("CUS");
}

/**
 * Generate Product Code
 */
export function generateProductCode() {
  return generateCode("PRD");
}

/**
 * Generate Order Number
 */
export function generateOrderNumber() {
  return generateCode("ORD");
}

/**
 * Calculate Discount
 */
export function calculateDiscount(
  mrp: number,
  discount: number
) {
  return mrp - (mrp * discount) / 100;
}

/**
 * Calculate GST
 */
export function calculateGST(
  amount: number,
  gst: number
) {
  return (amount * gst) / 100;
}

/**
 * Sleep Helper
 */
export function sleep(ms: number) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}