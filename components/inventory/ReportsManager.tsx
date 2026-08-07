"use client";

import React, { useEffect, useState } from 'react';
import { InventoryService } from '@/services/inventory.service';

export default function ReportsManager() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    InventoryService.reports().then(r => setData(r)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Inventory Reports</h3>
        <div className="text-xs text-slate-500">Exports available</div>
      </div>

      {loading ? <div className="skeleton h-24" /> : (
        <div className="text-sm">
          <div>Stock Value: ₹{data?.stockValue ?? '—'}</div>
          <div>Low Stock Items: {data?.lowStockCount ?? 0}</div>
          <div>Pending Transfers: {data?.pendingTransfers ?? 0}</div>
        </div>
      )}
    </div>
  );
}
