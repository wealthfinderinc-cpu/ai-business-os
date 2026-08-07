import { NextResponse } from 'next/server';

const stock: any[] = [];

export async function GET() {
  return NextResponse.json(stock);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const item = { id: `stk_${Date.now()}`, ...payload, createdAt: new Date().toISOString() };
  stock.push(item);
  return NextResponse.json(item);
}
