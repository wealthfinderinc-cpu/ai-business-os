"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function LeadGrowthChart() {
  const data = [
    { date: "Mon", leads: 4 },
    { date: "Tue", leads: 8 },
    { date: "Wed", leads: 6 },
    { date: "Thu", leads: 12 },
    { date: "Fri", leads: 10 },
  ];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Lead Growth
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            dataKey="leads"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}