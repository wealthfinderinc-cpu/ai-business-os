import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Return placeholder aggregated analytics
  const sample = {
    impressions: 120000,
    clicks: 3400,
    conversions: 110,
    spend: 48000,
    leads: 400
  };
  return NextResponse.json(sample);
}
