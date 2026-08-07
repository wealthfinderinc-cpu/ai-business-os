import { NextResponse } from 'next/server';

const expenseStore: any[] = [];

export async function GET() {
  return NextResponse.json(expenseStore);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const item = { id: `exp_${Date.now()}`, ...payload, createdAt: new Date().toISOString() };
  expenseStore.push(item);
  return NextResponse.json(item);
}
