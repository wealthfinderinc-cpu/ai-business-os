"use client";

import React, { useState } from 'react';
import { AIService } from '@/services/ai.service';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export default function AIProposalGenerator() {
  const [details, setDetails] = useState('');
  const [proposal, setProposal] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await AIService.proposal(details || 'Create a sales proposal for a SMB looking for CRM');
      setProposal(res.text || res as any);
    } catch (err) { toast.error('Proposal generation failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-medium">AI Proposal Generator</h3>
      <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={3} className="w-full border rounded p-2 mt-2" placeholder="Client details, budget, timeline..." />
      <div className="mt-2 flex gap-2"><Button onClick={generate}>{loading ? 'Generating…' : 'Generate Proposal'}</Button></div>
      {proposal && <div className="mt-3 whitespace-pre-wrap bg-slate-50 dark:bg-slate-800 p-3 rounded">{proposal}</div>}
    </div>
  );
}
