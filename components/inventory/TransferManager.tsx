"use client";

import React, { useEffect, useState } from 'react';
import { Transfer } from '@/types/inventory';
import { InventoryService } from '@/services/inventory.service';
import { Button } from '@/components/ui/Button';

export default function TransferManager() {
  const [items, setItems] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    InventoryService.listTransfers().then(r => setItems(r || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Transfers</h3>
        <Button onClick={() => alert('Create transfer')}>New</Button>
      </div>

      <div className="mt-3">
        {loading ? <div className="skeleton h-24" /> : (
          <ul className="space-y-2 text-sm">
            {items.map(t => (
              <li key={t.id} className="p-2 border rounded">{t.id} · {t.status}</li>
            ))}
            {items.length === 0 && <div className="text-slate-400">No transfers</div>}
          </ul>
        )}
      </div>
    </div>
  );
}
