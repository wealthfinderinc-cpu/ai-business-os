import { NextResponse } from 'next/server';

const incomeStore: any[] = [];

export async function GET() {
  return NextResponse.json(incomeStore);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const item = { id: `inc_${Date.now()}`, ...payload, createdAt: new Date().toISOString() };
  incomeStore.push(item);
  return NextResponse.json(item);
}
