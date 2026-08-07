// lib/marketing.ts

export function campaignROI(
  revenue: number,
  budget: number
) {
  if (budget === 0) return 0;

  return Number(
    (((revenue - budget) / budget) * 100).toFixed(
      2
    )
  );
}

export function campaignCTR(
  clicks: number,
  impressions: number
) {
  if (impressions === 0) return 0;

  return Number(
    ((clicks / impressions) * 100).toFixed(2)
  );
}