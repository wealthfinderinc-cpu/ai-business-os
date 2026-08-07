"use client";

import React, { useEffect, useState } from 'react';
import { StockItem } from '@/types/inventory';
import { InventoryService } from '@/services/inventory.service';
import { Button } from '@/components/ui/Button';

export default function StockManager() {
  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    InventoryService.listStock().then(r => setItems(r || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Stock</h3>
        <Button onClick={() => alert('Add stock')}>New</Button>
      </div>

      <div className="mt-3 overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-2">SKU</th>
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Warehouse</th>
              <th className="px-2 py-2">Qty</th>
              <th className="px-2 py-2">Reorder</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan={5} className="py-6 text-center text-slate-400">No stock items</td></tr>
            ) : (
              items.map(it => (
                <tr key={it.id}>
                  <td className="px-2 py-2">{it.sku}</td>
                  <td className="px-2 py-2">{it.name}</td>
                  <td className="px-2 py-2">{it.warehouseId}</td>
                  <td className="px-2 py-2">{it.quantity}</td>
                  <td className="px-2 py-2">{it.reorderLevel ?? '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
