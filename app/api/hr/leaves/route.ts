import { NextResponse } from 'next/server';

const leaves: any[] = [];

export async function GET() {
  return NextResponse.json(leaves);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const item = { id: `leave_${Date.now()}`, ...payload, status: 'pending', createdAt: new Date().toISOString() };
  leaves.push(item);
  return NextResponse.json(item);
}

export async function PUT(request: Request, { params }: any) {
  // simplistic update by id
  const { id } = params;
  const body = await request.json();
  const idx = leaves.findIndex(l => l.id === id);
  if (idx >= 0) leaves[idx] = { ...leaves[idx], ...body };
  return NextResponse.json(leaves[idx] || null);
}
