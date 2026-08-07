"use client";

import React, { useState } from 'react';
import { AIService } from '@/services/ai.service';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export default function AIChat() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await AIService.chat(prompt);
      setResponse(res.text || res as any);
    } catch (err) {
      toast.error('AI Chat failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-medium">AI Chat</h3>
      <p className="text-sm text-slate-500">Ask the AI for assistance across sales, support and operations.</p>

      <div className="mt-3 grid gap-2">
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} className="w-full border rounded p-2" placeholder="Type your question or prompt..." />
        <div className="flex items-center gap-2">
          <Button onClick={handleSubmit} disabled={loading}>{loading ? 'Thinking…' : 'Send'}</Button>
        </div>

        {response && (
          <div className="mt-4 bg-slate-50 dark:bg-slate-800 p-3 rounded">
            <div className="whitespace-pre-wrap">{response}</div>
          </div>
        )}
      </div>
    </div>
  );
}
