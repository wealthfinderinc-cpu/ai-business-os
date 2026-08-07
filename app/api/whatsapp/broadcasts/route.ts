import { NextResponse } from 'next/server';

const broadcasts: any[] = [];

export async function GET() {
  return NextResponse.json(broadcasts);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const item = { id: `b_${Date.now()}`, ...payload, createdAt: new Date().toISOString(), audienceCount: 0 };
  broadcasts.push(item);
  return NextResponse.json(item);
}
