"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type Lead = {
  status: string;
  source: string | null;
  createdAt: string;
};

export default function LeadGrowthChart() {
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
      const date = new Date(
        lead.createdAt
      ).toLocaleDateString();

      map.set(date, (map.get(date) ?? 0) + 1);
    });

    return Array.from(map.entries()).map(
      ([date, leads]) => ({
        date,
        leads,
      })
    );
  }, [data]);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Lead Growth
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="leads"
            stroke="#2563eb"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}