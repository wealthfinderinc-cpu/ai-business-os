"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import IncomeManager from './IncomeManager';
import ExpenseManager from './ExpenseManager';
import InvoicesManager from './InvoicesManager';
import PaymentsManager from './PaymentsManager';
import ProfitLossReport from './ProfitLossReport';
import CashFlowReport from './CashFlowReport';
import GSTManager from './GSTManager';

export default function FinanceDashboard() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Finance Dashboard</h1>
          <p className="text-sm text-slate-500">Overview of income, expenses, invoices, and cash flow.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>Export Excel</Button>
          <Button className="btn-ghost">Export PDF</Button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <IncomeManager />
            <ExpenseManager />
            <InvoicesManager />
            <PaymentsManager />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ProfitLossReport />
            <CashFlowReport />
            <GSTManager />
          </div>
        </div>

        <aside className="space-y-4">
          <Card>
            <h3 className="text-sm font-semibold">Quick Actions</h3>
            <div className="mt-3 flex flex-col gap-2">
              <Button onClick={() => alert('Create Invoice')}>Create Invoice</Button>
              <Button className="btn-ghost" onClick={() => alert('Record Payment')}>Record Payment</Button>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold">Reports</h3>
            <div className="mt-3 text-sm text-slate-500">Generate monthly reports, tax summaries and export to PDF/Excel.</div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
