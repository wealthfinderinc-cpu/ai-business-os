// lib/hr.ts

export function fullName(
  first: string,
  last: string
) {
  return `${first} ${last}`.trim();
}

export function annualSalary(
  monthly: number
) {
  return monthly * 12;
}

export function attendancePercentage(
  present: number,
  total: number
) {
  if (total === 0) return 0;

  return Number(
    ((present / total) * 100).toFixed(2)
  );
}