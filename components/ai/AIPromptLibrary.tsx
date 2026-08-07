"use client";

import React from 'react';

export default function AIPromptLibrary() {
  const templates = [
    { id: 'p1', name: 'Sales Cold Email', prompt: 'Write a cold email for {{company}}...' },
    { id: 'p2', name: 'Demo Follow-up', prompt: 'Follow up email after demo...' }
  ];

  return (
    <div className="card">
      <h3 className="text-lg font-medium">Prompt Library</h3>
      <div className="mt-3 space-y-2">
        {templates.map(t => (
          <div key={t.id} className="p-2 border rounded">
            <div className="font-medium">{t.name}</div>
            <div className="text-xs text-slate-500">{t.prompt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
