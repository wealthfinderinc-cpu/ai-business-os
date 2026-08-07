import { NextResponse } from 'next/server';

const candidates: any[] = [];

export async function GET() {
  return NextResponse.json(candidates);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const item = { id: `cand_${Date.now()}`, ...payload, appliedAt: new Date().toISOString(), status: 'applied' };
  candidates.push(item);
  return NextResponse.json(item);
}
