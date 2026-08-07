"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function AIPosterGenerator() {
  const [prompt, setPrompt] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    // Placeholder: In production this would call an image generation model or service
    await new Promise(r => setTimeout(r, 800));
    setUrl('https://via.placeholder.com/600x400?text=AI+Poster');
    setLoading(false);
  };

  return (
    <div className="card">
      <h3 className="text-lg font-medium">AI Poster Generator</h3>
      <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Poster prompt" className="w-full border rounded p-2 mt-2" />
      <div className="mt-2 flex gap-2"><Button onClick={generate}>{loading ? 'Generating…' : 'Generate Poster'}</Button></div>
      {url && <img src={url} alt="poster" className="mt-3 w-full rounded" />}
    </div>
  );
}
