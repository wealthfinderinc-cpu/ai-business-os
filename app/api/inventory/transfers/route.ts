import { NextResponse } from 'next/server';

const transfers: any[] = [];

export async function GET() {
  return NextResponse.json(transfers);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const item = { id: `trf_${Date.now()}`, ...payload, status: 'pending', createdAt: new Date().toISOString() };
  transfers.push(item);
  return NextResponse.json(item);
}
