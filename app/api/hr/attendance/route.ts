import { NextResponse } from 'next/server';

const attendance: any[] = [];

export async function GET() {
  return NextResponse.json(attendance);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const item = { id: `att_${Date.now()}`, ...payload, date: payload.date || new Date().toISOString() };
  attendance.push(item);
  return NextResponse.json(item);
}
