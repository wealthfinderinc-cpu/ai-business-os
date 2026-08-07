"use client";

import React, { useState } from 'react';
import { AIService } from '@/services/ai.service';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export default function AIContentWriter() {
  const [topic, setTopic] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const write = async () => {
    setLoading(true);
    try {
      const res = await AIService.content(topic || 'Write a LinkedIn post about CRM best practices');
      setOutput(res.text || res as any);
    } catch (err) { toast.error('Content generation failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-medium">AI Content Writer</h3>
      <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic or prompt" className="w-full border rounded p-2 mt-2" />
      <div className="mt-2 flex gap-2"><Button onClick={write}>{loading ? 'Writing…' : 'Write'}</Button></div>
      {output && <div className="mt-3 whitespace-pre-wrap bg-slate-50 dark:bg-slate-800 p-3 rounded">{output}</div>}
    </div>
  );
}
