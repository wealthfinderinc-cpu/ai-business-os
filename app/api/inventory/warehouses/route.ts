import { NextResponse } from 'next/server';

const warehouses: any[] = [];

export async function GET() {
  return NextResponse.json(warehouses);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const item = { id: `wh_${Date.now()}`, ...payload };
  warehouses.push(item);
  return NextResponse.json(item);
}
