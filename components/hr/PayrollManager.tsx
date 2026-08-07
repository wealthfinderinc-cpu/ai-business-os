"use client";

import React, { useEffect, useState } from 'react';
import { PayrollRecord } from '@/types/hr';
import { HRService } from '@/services/hr.service';
import { Button } from '@/components/ui/Button';

export default function PayrollManager() {
  const [payrolls, setPayrolls] = useState<PayrollRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    HRService.listPayroll().then(r => setPayrolls(r || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Payroll</h3>
        <Button onClick={() => alert('Run payroll')}>Run</Button>
      </div>

      <div className="mt-3">
        {loading ? <div className="skeleton h-24" /> : (
          <ul className="space-y-2 text-sm">
            {payrolls.slice(0,8).map(p => (
              <li key={p.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.employeeId}</div>
                  <div className="text-xs text-slate-500">{p.period} · Net ₹{p.net}</div>
                </div>
                <div className="text-xs text-slate-400">{p.status}</div>
              </li>
            ))}
            {payrolls.length === 0 && <li className="text-slate-400">No payroll records</li>}
          </ul>
        )}
      </div>
    </div>
  );
}
