export interface WhatsAppContact {
  id: string;
  name?: string | null;
  phone: string;
  tags?: string[];
  assignedTo?: string | null;
  createdAt?: string;
}

export interface WhatsAppMessage {
  id: string;
  conversationId: string;
  from: string;
  to: string;
  text?: string;
  media?: string | null;
  direction: 'inbound' | 'outbound';
  status?: 'sent' | 'delivered' | 'read' | 'failed';
  createdAt?: string;
}

export interface Conversation {
  id: string;
  contactId: string;
  assignee?: string | null;
  status: 'open' | 'pending' | 'closed';
  unreadCount?: number;
  lastMessage?: WhatsAppMessage | null;
  createdAt?: string;
}

export interface Template {
  id: string;
  name: string;
  language?: string;
  content: string;
  variables?: string[];
  createdAt?: string;
}

export interface Broadcast {
  id: string;
  name: string;
  templateId?: string | null;
  audienceCount?: number;
  scheduledAt?: string | null;
  status?: 'draft' | 'scheduled' | 'sent' | 'paused';
  createdAt?: string;
}
