import { NextResponse } from 'next/server';

const templates: any[] = [
  { id: 't1', name: 'Welcome', content: 'Hello {{name}}, welcome to our service!' }
];

export async function GET() {
  return NextResponse.json(templates);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const item = { id: `t_${Date.now()}`, ...payload, createdAt: new Date().toISOString() };
  templates.push(item);
  return NextResponse.json(item);
}
