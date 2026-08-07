"use client";

import React, { useEffect, useState } from 'react';
import { Invoice } from '@/types/finance';
import { FinanceService } from '@/services/finance.service';
import { Button } from '@/components/ui/Button';

export default function InvoicesManager() {
  const [items, setItems] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    FinanceService.listInvoices().then(r => setItems(r || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Invoices</h3>
        <Button onClick={() => alert('Create invoice')}>New</Button>
      </div>

      <div className="mt-3 overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-2">#</th>
              <th className="px-2 py-2">Customer</th>
              <th className="px-2 py-2">Date</th>
              <th className="px-2 py-2">Total</th>
              <th className="px-2 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan={5} className="py-6 text-center text-slate-400">No invoices</td></tr>
            ) : (
              items.map(inv => (
                <tr key={inv.id}>
                  <td className="px-2 py-2">{inv.number}</td>
                  <td className="px-2 py-2">{inv.customer}</td>
                  <td className="px-2 py-2">{inv.date}</td>
                  <td className="px-2 py-2">₹{inv.total}</td>
                  <td className="px-2 py-2">{inv.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
