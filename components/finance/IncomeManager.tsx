"use client";

import React, { useEffect, useState } from 'react';
import { Income } from '@/types/finance';
import { FinanceService } from '@/services/finance.service';
import { Button } from '@/components/ui/Button';

export default function IncomeManager() {
  const [items, setItems] = useState<Income[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    FinanceService.listIncome().then(r => setItems(r || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Income</h3>
        <Button onClick={() => alert('Add income')}>New</Button>
      </div>

      <div className="mt-3">
        {loading ? <div className="skeleton h-24" /> : (
          <ul className="space-y-2 text-sm">
            {items.slice(0,5).map(i => (
              <li key={i.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">₹{i.amount}</div>
                  <div className="text-xs text-slate-500">{i.description}</div>
                </div>
                <div className="text-xs text-slate-400">{new Date(i.date).toLocaleDateString()}</div>
              </li>
            ))}
            {items.length === 0 && <li className="text-slate-400">No income records</li>}
          </ul>
        )}
      </div>
    </div>
  );
}
