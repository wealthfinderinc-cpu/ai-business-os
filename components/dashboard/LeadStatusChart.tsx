"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function LeadStatusChart() {
  const data = [
    { status: "New", total: 8 },
    { status: "Contacted", total: 5 },
    { status: "Follow Up", total: 4 },
    { status: "Qualified", total: 3 },
    { status: "Converted", total: 2 },
    { status: "Lost", total: 1 },
  ];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Lead Status Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="total"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}