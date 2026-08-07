"use client";

import React, { useState } from "react";
import { Campaign } from "@/types/marketing";
import { Button } from "@/components/ui/Button";

export default function CampaignForm({ initial, onClose, onCreate, onUpdate }: any) {
  const [form, setForm] = useState<Partial<Campaign>>(initial || {});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white dark:bg-slate-800 rounded-md p-6 z-10 w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">{initial?.id ? 'Edit Campaign' : 'New Campaign'}</h3>

        <div className="grid gap-3">
          <input className="border p-2 rounded" placeholder="Name" value={form.name ?? ''} onChange={(e) => setForm({...form, name: e.target.value})} />

          <select className="border p-2 rounded" value={form.provider ?? ''} onChange={(e) => setForm({...form, provider: e.target.value as any})}>
            <option value="">Select provider</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="google">Google</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="whatsapp">WhatsApp</option>
          </select>

          <div className="flex items-center gap-2">
            <Button onClick={() => initial?.id ? onUpdate(initial.id, form) : onCreate(form)}>{initial?.id ? 'Update' : 'Create'}</Button>
            <Button className="btn-ghost" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
