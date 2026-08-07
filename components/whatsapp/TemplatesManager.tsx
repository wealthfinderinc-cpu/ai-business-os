"use client";

import React, { useEffect, useState } from 'react';
import { Template } from '@/types/whatsapp';
import { WhatsAppService } from '@/services/whatsapp.service';
import { Button } from '@/components/ui/Button';

export default function TemplatesManager() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    WhatsAppService.listTemplates().then(r => setTemplates(r || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Templates</h3>
        <Button onClick={() => {}}>New Template</Button>
      </div>

      {loading ? <div className="skeleton h-24" /> : (
        <div className="space-y-2">
          {templates.map(t => (
            <div key={t.id} className="p-2 border rounded">{t.name}<div className="text-xs text-slate-500">{t.content}</div></div>
          ))}
          {templates.length === 0 && <div className="text-slate-400 text-sm">No templates</div>}
        </div>
      )}
    </div>
  );
}
