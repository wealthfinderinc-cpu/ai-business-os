"use client";

import React from "react";
import { Campaign } from "@/types/marketing";

const columns = ['Name', 'Provider', 'Status', 'Budget', 'Start', 'End'];

export default function CampaignsTable() {
  // Placeholder static table; integrate with React Query and MarketingService in next steps
  const data: Campaign[] = [];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">All Campaigns</h3>
        <div className="text-xs text-slate-500">0 results</div>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c} className="px-2 py-3">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={6} className="py-8 text-center text-slate-400">No campaigns yet</td></tr>
            ) : (
              data.map((row) => (
                <tr key={row.id}>
                  <td className="px-2 py-3">{row.name}</td>
                  <td className="px-2 py-3">{row.provider}</td>
                  <td className="px-2 py-3">{row.status}</td>
                  <td className="px-2 py-3">{row.budget}</td>
                  <td className="px-2 py-3">{row.startDate}</td>
                  <td className="px-2 py-3">{row.endDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
