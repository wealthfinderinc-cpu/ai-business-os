import { NextResponse } from 'next/server';

const purchases: any[] = [];

export async function GET() {
  return NextResponse.json(purchases);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const item = { id: `pur_${Date.now()}`, ...payload, status: 'ordered', createdAt: new Date().toISOString() };
  purchases.push(item);
  return NextResponse.json(item);
}
