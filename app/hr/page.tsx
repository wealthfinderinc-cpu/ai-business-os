"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import EmployeesManager from '@/components/hr/EmployeesManager';
import AttendanceManager from '@/components/hr/AttendanceManager';
import LeaveManager from '@/components/hr/LeaveManager';
import PayrollManager from '@/components/hr/PayrollManager';

export default function HRPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">HR Enterprise</h1>
            <p className="text-sm text-slate-500">Manage employees, attendance, payroll, recruitment and performance.</p>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <EmployeesManager />
            <AttendanceManager />
            <LeaveManager />
          </div>

          <aside className="space-y-4">
            <PayrollManager />
            <div className="card">
              <h3 className="text-sm font-semibold">Quick Actions</h3>
              <div className="mt-3 flex flex-col gap-2">
                <button className="btn-primary">Run Payroll</button>
                <button className="btn-ghost">Generate Reports</button>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </DashboardLayout>
  );
}
