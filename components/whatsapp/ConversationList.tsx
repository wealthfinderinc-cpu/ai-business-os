"use client";

import React from 'react';
import { Conversation } from '@/types/whatsapp';

export default function ConversationList({ conversations, loading, onSelect }: any) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Inbox</h3>
        <div className="text-xs text-slate-500">{conversations.length}</div>
      </div>

      {loading ? (
        <div className="skeleton h-40" />
      ) : (
        <div className="space-y-2">
          {conversations.map((c: Conversation) => (
            <div key={c.id} className="p-3 rounded hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer" onClick={() => onSelect(c.id)}>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{c.lastMessage?.from ?? 'Unknown'}</div>
                <div className="text-xs text-slate-400">{c.unreadCount ? `${c.unreadCount}` : ''}</div>
              </div>
              <div className="text-xs text-slate-500">{c.lastMessage?.text ?? ''}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
