"use client";

import React, { useEffect, useState, useRef } from 'react';
import { WhatsAppService } from '@/services/whatsapp.service';
import { WhatsAppMessage } from '@/types/whatsapp';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export default function ChatWindow({ conversationId }: { conversationId: string }) {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!conversationId) return;
    setLoading(true);
    WhatsAppService.getMessages(conversationId)
      .then((res) => setMessages(res || []))
      .catch(() => toast.error('Failed to load messages'))
      .finally(() => setLoading(false));
  }, [conversationId]);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;
    const optimistic: WhatsAppMessage = {
      id: `tmp-${Date.now()}`,
      conversationId,
      from: 'me',
      to: 'them',
      text,
      direction: 'outbound',
      status: 'sent',
      createdAt: new Date().toISOString()
    };

    setMessages((m) => [...m, optimistic]);
    setText('');

    try {
      await WhatsAppService.sendMessage(conversationId, { text });
      toast.success('Message sent');
    } catch (err) {
      toast.error('Failed to send');
      // revert optimistic update or mark failed
      setMessages((m) => m.map(x => x.id === optimistic.id ? { ...x, status: 'failed' } : x));
    }
  };

  return (
    <div className="card flex flex-col h-[60vh]">
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {loading ? <div className="skeleton h-40" /> : messages.map((msg) => (
          <div key={msg.id} className={`max-w-[70%] p-2 rounded ${msg.direction === 'outbound' ? 'ml-auto bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
            <div className="text-sm">{msg.text}</div>
            <div className="text-xs text-slate-300 mt-1">{new Date(msg.createdAt || '').toLocaleString()}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="Write a message..." />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div>
  );
}
