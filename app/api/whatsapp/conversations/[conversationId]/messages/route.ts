import { NextResponse } from 'next/server';

const messagesStore: Record<string, any[]> = {
  'conv_1': [
    { id: 'm1', conversationId: 'conv_1', from: '+911234567890', to: 'business', text: 'Hello', direction: 'inbound', createdAt: new Date().toISOString() }
  ]
};

export async function GET(request: Request, { params }: any) {
  const { conversationId } = params;
  return NextResponse.json(messagesStore[conversationId] || []);
}

export async function POST(request: Request, { params }: any) {
  const { conversationId } = params;
  const payload = await request.json();
  const item = { id: `m_${Date.now()}`, conversationId, ...payload, createdAt: new Date().toISOString() };
  messagesStore[conversationId] = messagesStore[conversationId] || [];
  messagesStore[conversationId].push(item);
  return NextResponse.json(item);
}
