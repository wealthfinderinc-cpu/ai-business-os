import { NextResponse } from 'next/server';

const employees: any[] = [];

export async function GET() {
  return NextResponse.json(employees);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const item = { id: `emp_${Date.now()}`, ...payload, joinedAt: new Date().toISOString(), active: true };
  employees.push(item);
  return NextResponse.json(item);
}
