"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CampaignManager from "@/components/marketing/CampaignManager";
import ROIChart from "@/components/marketing/ROIChart";
import CampaignsTable from "@/components/marketing/CampaignsTable";

export default function MarketingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Marketing Engine</h1>
            <p className="text-sm text-slate-500">Manage campaigns across channels, track ROI and acquisition metrics.</p>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CampaignManager />
          </div>

          <aside className="space-y-4">
            <ROIChart />
          </aside>
        </section>

        <section>
          <CampaignsTable />
        </section>
      </div>
    </DashboardLayout>
  );
}
