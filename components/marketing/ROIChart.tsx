"use client";

import React from "react";
import { toast } from "sonner";

export default function ROIChart() {
  // Placeholder chart component: in production replace with recharts or chart.js
  return (
    <div className="card">
      <h3 className="text-sm font-semibold mb-2">ROI Dashboard</h3>
      <div className="h-40 flex items-center justify-center text-slate-400">Chart Placeholder</div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <div className="text-xs text-slate-500">CPL</div>
          <div className="font-semibold">₹120</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">CAC</div>
          <div className="font-semibold">₹1,200</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Conversion Rate</div>
          <div className="font-semibold">3.2%</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Spend</div>
          <div className="font-semibold">₹48,000</div>
        </div>
      </div>
    </div>
  );
}
