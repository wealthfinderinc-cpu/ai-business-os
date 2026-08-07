"use client";

import { useState } from "react";

import {
  TrendingUp,
  Users,
  Package,
  IndianRupee,
  ShoppingCart,
  Briefcase,
  Download,
  Printer,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ReportsDashboard() {

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const cards = [

    {
      title: "Total Sales",
      value: "₹12,45,850",
      icon: IndianRupee,
      color: "bg-green-100 text-green-700",
    },

    {
      title: "Customers",
      value: "1,248",
      icon: Users,
      color: "bg-blue-100 text-blue-700",
    },

    {
      title: "Orders",
      value: "856",
      icon: ShoppingCart,
      color: "bg-orange-100 text-orange-700",
    },

    {
      title: "Products",
      value: "312",
      icon: Package,
      color: "bg-purple-100 text-purple-700",
    },

    {
      title: "Employees",
      value: "42",
      icon: Briefcase,
      color: "bg-cyan-100 text-cyan-700",
    },

    {
      title: "Growth",
      value: "+18%",
      icon: TrendingUp,
      color: "bg-emerald-100 text-emerald-700",
    },

  ];

  return (

    <div className="space-y-6">

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold">

            Reports Dashboard

          </h1>

          <p className="text-slate-500">

            Executive Analytics & Reports

          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <Input
            type="date"
            value={fromDate}
            onChange={(e)=>
              setFromDate(
                e.target.value
              )
            }
          />

          <Input
            type="date"
            value={toDate}
            onChange={(e)=>
              setToDate(
                e.target.value
              )
            }
          />

          <Button>

            <Download
              className="mr-2 h-4 w-4"
            />

            Export

          </Button>

          <Button
            variant="outline"
            onClick={() =>
              window.print()
            }
          >

            <Printer
              className="mr-2 h-4 w-4"
            />

            Print

          </Button>

        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {cards.map((card) => {

          const Icon = card.icon;

          return (

            <div
              key={card.title}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">

                    {card.title}

                  </p>

                  <h2 className="mt-2 text-3xl font-bold">

                    {card.value}

                  </h2>

                </div>

                <div
                  className={`rounded-full p-4 ${card.color}`}
                >

                  <Icon className="h-7 w-7" />

                </div>

              </div>

            </div>

          );

        })}

      </div>      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h3 className="mb-5 text-xl font-semibold">
            Sales Analytics
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Total Revenue</span>

              <strong className="text-green-700">
                ₹12,45,850
              </strong>

            </div>

            <div className="flex justify-between">

              <span>Total Orders</span>

              <strong>856</strong>

            </div>

            <div className="flex justify-between">

              <span>Average Order Value</span>

              <strong>₹1,455</strong>

            </div>

            <div className="flex justify-between">

              <span>Monthly Growth</span>

              <strong className="text-green-600">
                +18%
              </strong>

            </div>

          </div>

        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h3 className="mb-5 text-xl font-semibold">
            Customer Analytics
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Total Customers</span>

              <strong>1,248</strong>

            </div>

            <div className="flex justify-between">

              <span>New Customers</span>

              <strong>186</strong>

            </div>

            <div className="flex justify-between">

              <span>Returning Customers</span>

              <strong>783</strong>

            </div>

            <div className="flex justify-between">

              <span>Conversion Rate</span>

              <strong>68%</strong>

            </div>

          </div>

        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h3 className="mb-5 text-xl font-semibold">
            Finance Overview
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Total Income</span>

              <strong className="text-green-700">
                ₹18,75,000
              </strong>

            </div>

            <div className="flex justify-between">

              <span>Total Expense</span>

              <strong className="text-red-600">
                ₹6,29,150
              </strong>

            </div>

            <div className="flex justify-between">

              <span>Net Profit</span>

              <strong className="text-blue-700">
                ₹12,45,850
              </strong>

            </div>

          </div>

        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h3 className="mb-5 text-xl font-semibold">
            Inventory Summary
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Total Products</span>

              <strong>312</strong>

            </div>

            <div className="flex justify-between">

              <span>Low Stock Items</span>

              <strong className="text-red-600">
                18
              </strong>

            </div>

            <div className="flex justify-between">

              <span>Out of Stock</span>

              <strong>
                4
              </strong>

            </div>

          </div>

        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h3 className="mb-5 text-xl font-semibold">
            HR Overview
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Total Employees</span>

              <strong>42</strong>

            </div>

            <div className="flex justify-between">

              <span>Present Today</span>

              <strong className="text-green-600">
                38
              </strong>

            </div>

            <div className="flex justify-between">

              <span>On Leave</span>

              <strong>
                3
              </strong>

            </div>

            <div className="flex justify-between">

              <span>Absent</span>

              <strong className="text-red-600">
                1
              </strong>

            </div>

          </div>

        </div>

        <div className="rounded-xl border bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white shadow-sm">

          <h3 className="mb-4 text-xl font-semibold">
            AI Business Insight
          </h3>

          <p className="leading-7">

            Revenue increased by
            <strong> 18% </strong>
            compared to last month.

            <br /><br />

            Top performing category is
            <strong> Wellness Products</strong>.

            <br /><br />

            Inventory for
            <strong> 18 products </strong>
            should be replenished.

            <br /><br />

            Customer retention is improving,
            but follow-up completion can be increased
            to improve conversions.

          </p>

        </div>

      </div>      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h3 className="mb-5 text-xl font-semibold">
            Monthly Sales Trend
          </h3>

          <div className="flex h-80 items-center justify-center rounded-lg border-2 border-dashed">

            <div className="text-center">

              <TrendingUp className="mx-auto mb-4 h-16 w-16 text-slate-400" />

              <p className="font-medium text-slate-600">

                Sales Chart

              </p>

              <p className="mt-2 text-sm text-slate-400">

                Recharts / Chart.js Integration

              </p>

            </div>

          </div>

        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h3 className="mb-5 text-xl font-semibold">
            Revenue vs Expense
          </h3>

          <div className="flex h-80 items-center justify-center rounded-lg border-2 border-dashed">

            <div className="text-center">

              <IndianRupee className="mx-auto mb-4 h-16 w-16 text-slate-400" />

              <p className="font-medium text-slate-600">

                Financial Chart

              </p>

              <p className="mt-2 text-sm text-slate-400">

                Revenue / Expense Comparison

              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <h3 className="mb-6 text-xl font-semibold">

          Top Selling Products

        </h3>

        <table className="min-w-full text-sm">

          <thead>

            <tr className="bg-slate-100">

              <th className="border px-4 py-3 text-left">
                Product
              </th>

              <th className="border px-4 py-3 text-center">
                Units Sold
              </th>

              <th className="border px-4 py-3 text-right">
                Revenue
              </th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td className="border px-4 py-3">
                Wellness Kit
              </td>

              <td className="border px-4 py-3 text-center">
                425
              </td>

              <td className="border px-4 py-3 text-right">
                ₹4,85,000
              </td>

            </tr>

            <tr>

              <td className="border px-4 py-3">
                Nutrition Pack
              </td>

              <td className="border px-4 py-3 text-center">
                318
              </td>

              <td className="border px-4 py-3 text-right">
                ₹3,12,000
              </td>

            </tr>

            <tr>

              <td className="border px-4 py-3">
                Health Combo
              </td>

              <td className="border px-4 py-3 text-center">
                276
              </td>

              <td className="border px-4 py-3 text-right">
                ₹2,48,000
              </td>

            </tr>

          </tbody>

        </table>

      </div>

      <div className="flex items-center justify-between rounded-xl border bg-white p-6 shadow-sm">

        <div>

          <h3 className="text-lg font-semibold">

            Executive Report

          </h3>

          <p className="text-sm text-slate-500">

            Export reports in PDF or Excel format.

          </p>

        </div>

        <div className="flex gap-3">

          <Button>

            <Download className="mr-2 h-4 w-4" />

            Export PDF

          </Button>

          <Button variant="outline">

            <Download className="mr-2 h-4 w-4" />

            Export Excel

          </Button>

        </div>

      </div>

    </div>

  );

}