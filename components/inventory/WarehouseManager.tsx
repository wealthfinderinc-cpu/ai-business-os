"use client";

import React, { useEffect, useState } from 'react';
import { Warehouse } from '@/types/inventory';
import { InventoryService } from '@/services/inventory.service';
import { Button } from '@/components/ui/Button';

export default function WarehouseManager() {
  const [items, setItems] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    InventoryService.listWarehouses().then(r => setItems(r || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Warehouses</h3>
        <Button onClick={() => alert('Add warehouse')}>New</Button>
      </div>

      <div className="mt-3 space-y-2 text-sm">
        {loading ? <div className="skeleton h-24" /> : (
          items.map(w => (
            <div key={w.id} className="p-2 border rounded">{w.name}<div className="text-xs text-slate-500">{w.address}</div></div>
          ))
        )}
        {items.length === 0 && <div className="text-slate-400">No warehouses</div>}
      </div>
    </div>
  );
}
