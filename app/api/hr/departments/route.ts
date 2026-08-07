import { NextResponse } from 'next/server';

const departments: any[] = [];

export async function GET() {
  return NextResponse.json(departments);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const item = { id: `dept_${Date.now()}`, ...payload };
  departments.push(item);
  return NextResponse.json(item);
}
