import { NextResponse } from 'next/server';

// Simple in-memory store for demo purposes. Replace with Prisma/database in production.
const campaigns: any[] = [];

export async function GET(request: Request) {
  return NextResponse.json(campaigns);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const item = { id: `cmp_${Date.now()}`, ...payload, createdAt: new Date().toISOString() };
  campaigns.push(item);
  return NextResponse.json(item);
}
