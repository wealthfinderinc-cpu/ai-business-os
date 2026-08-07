"use client";

import React, { useEffect, useState } from 'react';
import { Supplier } from '@/types/inventory';
import { InventoryService } from '@/services/inventory.service';
import { Button } from '@/components/ui/Button';

export default function SupplierManager() {
  const [items, setItems] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    InventoryService.listSuppliers().then(r => setItems(r || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Suppliers</h3>
        <Button onClick={() => alert('Add supplier')}>New</Button>
      </div>

      <div className="mt-3 space-y-2 text-sm">
        {loading ? <div className="skeleton h-24" /> : (
          items.map(s => (
            <div key={s.id} className="p-2 border rounded">{s.name}<div className="text-xs text-slate-500">{s.phone}</div></div>
          ))
        )}
        {items.length === 0 && <div className="text-slate-400">No suppliers</div>}
      </div>
    </div>
  );
}
