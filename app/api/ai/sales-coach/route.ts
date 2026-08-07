import { NextResponse } from 'next/server';
import { generateText } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = `You are an AI sales coach. Provide tactics and a playbook for: ${body?.prompt || ''}`;
    const text = await generateText(prompt, { system: 'You are a professional sales coach.' });
    return NextResponse.json({ text });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'AI error' }, { status: 500 });
  }
}
