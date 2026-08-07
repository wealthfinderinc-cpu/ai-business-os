"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

type Lead = {
  status: string;
  source: string | null;
  createdAt: string;
};

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
  "#ea580c",
];

export default function LeadSourceChart() {
  const { data = [] } = useQuery<Lead[]>({
    queryKey: ["dashboard-chart"],

    queryFn: async () => {
      const res = await fetch("/api/dashboard/charts");

      if (!res.ok) {
        throw new Error("Chart API Error");
      }

      return res.json();
    },
  });

  const chartData = useMemo(() => {
    const map = new Map<string, number>();

    data.forEach((lead) => {
      const source =
        lead.source?.trim() || "Unknown";

      map.set(source, (map.get(source) ?? 0) + 1);
    });

    return Array.from(map.entries()).map(
      ([name, value]) => ({
        name,
        value,
      })
    );
  }, [data]);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Lead Source Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >

            {chartData.map((_, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[index % COLORS.length]
                }
              />
            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}