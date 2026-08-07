"use client";

import React, { useEffect, useState } from 'react';
import { ProfitLoss } from '@/types/finance';
import { FinanceService } from '@/services/finance.service';

export default function ProfitLossReport() {
  const [data, setData] = useState<ProfitLoss | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    FinanceService.getProfitLoss().then(r => setData(r)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h3 className="text-sm font-semibold">Profit & Loss</h3>
      {loading ? <div className="skeleton h-24" /> : (
        data ? (
          <div className="mt-3 text-sm">
            <div>Revenue: ₹{data.revenue}</div>
            <div>Expenses: ₹{data.expenses}</div>
            <div className="font-semibold">Net Profit: ₹{data.netProfit}</div>
          </div>
        ) : <div className="text-slate-400">No data</div>
      )}
    </div>
  );
}
