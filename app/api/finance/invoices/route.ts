import { NextResponse } from 'next/server';

const invoiceStore: any[] = [];

export async function GET() {
  return NextResponse.json(invoiceStore);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const item = { id: `inv_${Date.now()}`, number: `INV-${Date.now()}`, status: 'draft', ...payload, createdAt: new Date().toISOString() };
  invoiceStore.push(item);
  return NextResponse.json(item);
}
