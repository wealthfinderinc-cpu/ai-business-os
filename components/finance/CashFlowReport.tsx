"use client";

import React, { useEffect, useState } from 'react';
import { CashFlow } from '@/types/finance';
import { FinanceService } from '@/services/finance.service';

export default function CashFlowReport() {
  const [data, setData] = useState<CashFlow | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    FinanceService.getCashFlow().then(r => setData(r)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h3 className="text-sm font-semibold">Cash Flow</h3>
      {loading ? <div className="skeleton h-24" /> : (
        data ? (
          <div className="mt-3 text-sm">
            <div>Opening: ₹{data.opening}</div>
            <div>Inflows: ₹{data.inflows}</div>
            <div>Outflows: ₹{data.outflows}</div>
            <div className="font-semibold">Closing: ₹{data.closing}</div>
          </div>
        ) : <div className="text-slate-400">No data</div>
      )}
    </div>
  );
}
