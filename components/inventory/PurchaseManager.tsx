"use client";

import React, { useEffect, useState } from 'react';
import { Purchase } from '@/types/inventory';
import { InventoryService } from '@/services/inventory.service';
import { Button } from '@/components/ui/Button';

export default function PurchaseManager() {
  const [items, setItems] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    InventoryService.listPurchases().then(r => setItems(r || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Purchases</h3>
        <Button onClick={() => alert('Create purchase')}>New</Button>
      </div>

      <div className="mt-3">
        {loading ? <div className="skeleton h-24" /> : (
          <ul className="space-y-2 text-sm">
            {items.map(p => (
              <li key={p.id} className="p-2 border rounded">{p.id} · {p.status}</li>
            ))}
            {items.length === 0 && <div className="text-slate-400">No purchases</div>}
          </ul>
        )}
      </div>
    </div>
  );
}
