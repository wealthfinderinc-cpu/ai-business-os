"use client";

import React, { useState } from 'react';
import { AIService } from '@/services/ai.service';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export default function AIReportGenerator() {
  const [prompt, setPrompt] = useState('Generate a weekly marketing performance report');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await AIService.report(prompt);
      setReport(res.text || res as any);
    } catch (err) {
      toast.error('Report generation failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-medium">AI Report Generator</h3>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} className="w-full border rounded p-2 mt-2" />
      <div className="mt-2 flex gap-2"><Button onClick={generate}>{loading ? 'Generating…' : 'Generate Report'}</Button></div>
      {report && <div className="mt-3 whitespace-pre-wrap bg-slate-50 dark:bg-slate-800 p-3 rounded">{report}</div>}
    </div>
  );
}
