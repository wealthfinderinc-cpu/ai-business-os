"use client";

import React, { useState } from 'react';
import { AIService } from '@/services/ai.service';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export default function AISalesCoach() {
  const [context, setContext] = useState('');
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(false);

  const runCoach = async () => {
    if (!context) return;
    setLoading(true);
    try {
      const res = await AIService.salesCoach(context);
      setInsights(res.text || res as any);
    } catch (err) {
      toast.error('Sales coach failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-medium">AI Sales Coach</h3>
      <p className="text-sm text-slate-500">Paste a sales transcript or deal notes to get recommended actions and objection handling.</p>
      <textarea value={context} onChange={(e) => setContext(e.target.value)} rows={4} className="w-full border rounded p-2 mt-2" />
      <div className="mt-2 flex gap-2">
        <Button onClick={runCoach} disabled={loading}>{loading ? 'Analyzing…' : 'Coach me'}</Button>
      </div>
      {insights && <div className="mt-3 whitespace-pre-wrap bg-slate-50 dark:bg-slate-800 p-3 rounded">{insights}</div>}
    </div>
  );
}
