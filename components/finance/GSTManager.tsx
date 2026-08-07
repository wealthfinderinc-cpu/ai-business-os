"use client";

import React, { useEffect, useState } from 'react';
import { GSTReport } from '@/types/finance';
import { FinanceService } from '@/services/finance.service';

export default function GSTManager() {
  const [data, setData] = useState<GSTReport | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    FinanceService.getGST().then(r => setData(r)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h3 className="text-sm font-semibold">GST Summary</h3>
      {loading ? <div className="skeleton h-24" /> : (
        data ? (
          <div className="mt-3 text-sm">
            <div>Output Tax: ₹{data.outputTax}</div>
            <div>Input Tax: ₹{data.inputTax}</div>
            <div className="font-semibold">Payable: ₹{data.payable}</div>
          </div>
        ) : <div className="text-slate-400">No data</div>
      )}
    </div>
  );
}
