"use client";

import React from 'react';
import StockManager from './StockManager';
import WarehouseManager from './WarehouseManager';
import TransferManager from './TransferManager';
import PurchaseManager from './PurchaseManager';
import SupplierManager from './SupplierManager';
import LowStockAlert from './LowStockAlert';
import BarcodeGenerator from './BarcodeGenerator';
import ReportsManager from './ReportsManager';
import { Button } from '@/components/ui/Button';

export default function InventoryDashboard() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Inventory Enterprise</h1>
          <p className="text-sm text-slate-500">Manage stock, warehouses, purchases, transfers and suppliers.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>Export Excel</Button>
          <Button className="btn-ghost">Export PDF</Button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <StockManager />
          <TransferManager />
          <PurchaseManager />
        </div>

        <aside className="space-y-4">
          <WarehouseManager />
          <SupplierManager />
          <LowStockAlert />
          <BarcodeGenerator />
        </aside>
      </section>

      <section>
        <ReportsManager />
      </section>
    </div>
  );
}
