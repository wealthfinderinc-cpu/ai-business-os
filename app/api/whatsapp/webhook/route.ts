// Webhook endpoint for WhatsApp Cloud API (server-side)
// This should be configured in the Meta App Dashboard to receive messages/events.

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const payload = await request.json();
  // TODO: validate signature and process incoming messages
  console.log('WhatsApp webhook payload', payload);
  return NextResponse.json({ ok: true });
}

export async function GET(request: Request) {
  // For webhook verification (challenge)
  const url = new URL(request.url);
  const challenge = url.searchParams.get('hub.challenge');
  if (challenge) return new Response(challenge);
  return NextResponse.json({ ok: true });
}
