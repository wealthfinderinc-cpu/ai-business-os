"use client";

import React, { useEffect, useState } from 'react';
import { InventoryService } from '@/services/inventory.service';

export default function LowStockAlert() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    InventoryService.lowStock().then(r => setItems(r || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h3 className="text-sm font-semibold">Low Stock Alerts</h3>
      <div className="mt-3">
        {loading ? <div className="skeleton h-24" /> : (
          <ul className="space-y-2 text-sm">
            {items.map(i => (
              <li key={i.id} className="flex items-center justify-between p-2 border rounded">{i.name}<div className="text-xs text-red-500">{i.quantity}</div></li>
            ))}
            {items.length === 0 && <div className="text-slate-400">All stock levels are healthy</div>}
          </ul>
        )}
      </div>
    </div>
  );
}
