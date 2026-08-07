"use client";

import { AlertTriangle } from "lucide-react";

export default function LowStockCard() {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-5">

      <div className="flex items-center gap-3">

        <AlertTriangle className="text-red-600" />

        <div>

          <h2 className="text-lg font-bold text-red-700">
            Low Stock Alert
          </h2>

          <p className="text-sm text-red-600">
            Products below minimum stock will appear here.
          </p>

        </div>

      </div>

    </div>
  );
}