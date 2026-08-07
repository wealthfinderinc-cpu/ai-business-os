import { NextResponse } from 'next/server';

const suppliers: any[] = [];

export async function GET() {
  return NextResponse.json(suppliers);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const item = { id: `sup_${Date.now()}`, ...payload, createdAt: new Date().toISOString() };
  suppliers.push(item);
  return NextResponse.json(item);
}
