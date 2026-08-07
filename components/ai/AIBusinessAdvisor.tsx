"use client";

import React, { useState } from 'react';
import { AIService } from '@/services/ai.service';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export default function AIBusinessAdvisor() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question) return;
    setLoading(true);
    try {
      const res = await AIService.chat(question);
      setAnswer(res.text || res as any);
    } catch (err) { toast.error('Advisor failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-medium">AI Business Advisor</h3>
      <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={3} className="w-full border rounded p-2 mt-2" placeholder="Ask about growth strategy, pricing, or operations" />
      <div className="mt-2 flex gap-2"><Button onClick={ask}>{loading ? 'Thinking…' : 'Ask Advisor'}</Button></div>
      {answer && <div className="mt-3 whitespace-pre-wrap bg-slate-50 dark:bg-slate-800 p-3 rounded">{answer}</div>}
    </div>
  );
}
