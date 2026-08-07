import { NextResponse } from 'next/server';
import { generateText } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = `Generate a professional report based on: ${body?.prompt || ''}`;
    const text = await generateText(prompt, { system: 'You are an expert report writer.' });
    return NextResponse.json({ text });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'AI error' }, { status: 500 });
  }
}
