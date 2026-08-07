"use client";

import React, { useEffect, useState } from 'react';
import { Payment } from '@/types/finance';
import { FinanceService } from '@/services/finance.service';
import { Button } from '@/components/ui/Button';

export default function PaymentsManager() {
  const [items, setItems] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    FinanceService.listPayments().then(r => setItems(r || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Payments</h3>
        <Button onClick={() => alert('Record payment')}>New</Button>
      </div>

      <div className="mt-3">
        {loading ? <div className="skeleton h-24" /> : (
          <ul className="space-y-2 text-sm">
            {items.slice(0,5).map(p => (
              <li key={p.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">₹{p.amount}</div>
                  <div className="text-xs text-slate-500">{p.method ?? p.reference}</div>
                </div>
                <div className="text-xs text-slate-400">{new Date(p.date).toLocaleDateString()}</div>
              </li>
            ))}
            {items.length === 0 && <li className="text-slate-400">No payments</li>}
          </ul>
        )}
      </div>
    </div>
  );
}
