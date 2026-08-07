import { NextResponse } from 'next/server';

export async function GET() {
  const sample = { stockValue: 120000, lowStockCount: 3, pendingTransfers: 1 };
  return NextResponse.json(sample);
}
