"use client";

import React, { useState } from 'react';
import TemplatesManager from './TemplatesManager';
import SharedInbox from './SharedInbox';
import { Button } from '@/components/ui/Button';

export default function WhatsAppModule() {
  const [tab, setTab] = useState<'inbox'|'templates'|'broadcast'|'bot'>('inbox');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">WhatsApp AI CRM</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => setTab('inbox')}>Inbox</Button>
          <Button onClick={() => setTab('templates')}>Templates</Button>
          <Button onClick={() => setTab('broadcast')}>Broadcast</Button>
          <Button onClick={() => setTab('bot')}>AI Chatbot</Button>
        </div>
      </div>

      <div>
        {tab === 'inbox' && <SharedInbox />}
        {tab === 'templates' && <TemplatesManager />}
        {tab === 'broadcast' && <div className="card">Broadcast Manager (scaffold)</div>}
        {tab === 'bot' && <div className="card">AI Chatbot (scaffold)</div>}
      </div>
    </div>
  );
}
