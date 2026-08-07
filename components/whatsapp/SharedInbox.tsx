"use client";

import React, { useEffect, useState } from 'react';
import { Conversation } from '@/types/whatsapp';
import { WhatsAppService } from '@/services/whatsapp.service';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';

export default function SharedInbox() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    WhatsAppService.listConversations()
      .then((res) => setConversations(res || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1">
        <ConversationList conversations={conversations} loading={loading} onSelect={(id) => setSelected(id)} />
      </div>

      <div className="lg:col-span-2">
        {selected ? <ChatWindow conversationId={selected} /> : <div className="card">Select a conversation to view messages</div>}
      </div>
    </div>
  );
}
