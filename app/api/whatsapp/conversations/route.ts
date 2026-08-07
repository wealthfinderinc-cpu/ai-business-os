import { NextResponse } from 'next/server';

const conversations: any[] = [
  {
    id: 'conv_1',
    contactId: 'c_1',
    assignee: null,
    status: 'open',
    unreadCount: 1,
    lastMessage: { id: 'm1', from: '+911234567890', text: 'Hello', createdAt: new Date().toISOString() }
  }
];

export async function GET() {
  return NextResponse.json(conversations);
}
