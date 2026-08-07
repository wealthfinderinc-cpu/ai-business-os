import { NextResponse } from 'next/server';
import { generateText } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = `Create a sales proposal document for: ${body?.prompt || ''}`;
    const text = await generateText(prompt, { system: 'You are a professional proposal writer.' });
    return NextResponse.json({ text });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'AI error' }, { status: 500 });
  }
}
