import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Return aggregated report placeholders
  const sample = {
    gst: { period: 'monthly', outputTax: 12000, inputTax: 8000, payable: 4000 },
    profitLoss: { period: 'monthly', revenue: 120000, expenses: 72000, netProfit: 48000 },
    cashFlow: { period: 'monthly', opening: 20000, inflows: 150000, outflows: 120000, closing: 50000 }
  };
  return NextResponse.json(sample);
}
