import { NextResponse } from 'next/server';

const reviews: any[] = [];

export async function GET() {
  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const item = { id: `rev_${Date.now()}`, ...payload, createdAt: new Date().toISOString() };
  reviews.push(item);
  return NextResponse.json(item);
}
