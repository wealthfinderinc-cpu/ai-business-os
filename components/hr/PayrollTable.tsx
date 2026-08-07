"use client";

import { useMemo, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { usePayroll } from "@/hooks/usePayroll";

import { PayrollService } from "@/services/payroll.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Payroll = {

  id: number;

  month: string;

  basicSalary: number;

  allowance: number;

  deduction: number;

  netSalary: number;

  status:
    | "PENDING"
    | "PAID";

  employee: {

    id: number;

    employeeCode: string;

    fullName: string;

    department?: {

      name: string;

    };

  };

};

export default function PayrollTable() {

  const queryClient =
    useQueryClient();

  const {

    data,

    isLoading,

    isError,

    refetch,

  } = usePayroll();

  const payrolls: Payroll[] =
    (data as any)?.data ??
    (Array.isArray(data)
      ? data
      : []);

  const [search, setSearch] =
    useState("");

  const [month, setMonth] =
    useState("");

  const filteredPayroll =
    useMemo(() => {

      return payrolls.filter(
        (item) => {

          const matchSearch =

            item.employee.fullName
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            item.employee.employeeCode
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchMonth =

            !month ||

            item.month === month;

          return (
            matchSearch &&
            matchMonth
          );

        }
      );

    }, [
      payrolls,
      search,
      month,
    ]);

  async function markPaid(
    id: number
  ) {

    try {

      await PayrollService.markPaid(
        id
      );

      toast.success(
        "Salary marked as paid."
      );

      queryClient.invalidateQueries({

        queryKey: [
          "payroll",
        ],

      });

    } catch {

      toast.error(
        "Unable to update payroll."
      );

    }

  }

  async function generateSlip(
    id: number
  ) {

    try {

      await PayrollService.downloadSlip(
        id
      );

    } catch {

      toast.error(
        "Unable to download salary slip."
      );

    }

  }

  if (isLoading) {

    return (

      <div className="rounded-xl border bg-white p-8">

        <div className="flex justify-center py-12">

          Loading Payroll...

        </div>

      </div>

    );

  }

  if (isError) {

    return (

      <div className="rounded-xl border bg-white p-8">

        <div className="space-y-4 text-center">

          <p>

            Unable to load payroll.

          </p>

          <Button
            onClick={() =>
              refetch()
            }
          >
            Retry
          </Button>

        </div>

      </div>

    );

  }

  return (

    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">

            Payroll

          </h2>

          <p className="text-slate-500">

            Total Records :
            {" "}
            {filteredPayroll.length}

          </p>

        </div>

        <div className="flex gap-3">

          <Input
            className="w-72"
            placeholder="Search Employee..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <Input
            type="month"
            value={month}
            onChange={(e) =>
              setMonth(
                e.target.value
              )
            }
          />

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full text-sm">          <thead className="bg-slate-100">

            <tr>

              <th className="border px-4 py-3 text-left">
                Employee
              </th>

              <th className="border px-4 py-3 text-left">
                Department
              </th>

              <th className="border px-4 py-3 text-right">
                Basic Salary
              </th>

              <th className="border px-4 py-3 text-right">
                Allowance
              </th>

              <th className="border px-4 py-3 text-right">
                Deduction
              </th>

              <th className="border px-4 py-3 text-right">
                Net Salary
              </th>

              <th className="border px-4 py-3 text-center">
                Status
              </th>

              <th className="border px-4 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredPayroll.length === 0 ? (

              <tr>

                <td
                  colSpan={8}
                  className="py-12 text-center text-slate-500"
                >
                  No Payroll Records Found
                </td>

              </tr>

            ) : (

              filteredPayroll.map((item) => (

                <tr
                  key={item.id}
                  className="hover:bg-slate-50"
                >

                  <td className="border px-4 py-3">

                    <div>

                      <p className="font-medium">

                        {item.employee.fullName}

                      </p>

                      <p className="text-xs text-slate-500">

                        {item.employee.employeeCode}

                      </p>

                    </div>

                  </td>

                  <td className="border px-4 py-3">

                    {item.employee.department?.name || "-"}

                  </td>

                  <td className="border px-4 py-3 text-right">

                    ₹{item.basicSalary.toLocaleString()}

                  </td>

                  <td className="border px-4 py-3 text-right text-green-600">

                    ₹{item.allowance.toLocaleString()}

                  </td>

                  <td className="border px-4 py-3 text-right text-red-600">

                    ₹{item.deduction.toLocaleString()}

                  </td>

                  <td className="border px-4 py-3 text-right font-bold text-blue-700">

                    ₹{item.netSalary.toLocaleString()}

                  </td>

                  <td className="border px-4 py-3 text-center">

                    {item.status === "PAID" ? (

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                        Paid

                      </span>

                    ) : (

                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">

                        Pending

                      </span>

                    )}

                  </td>

                  <td className="border px-4 py-3">

                    <div className="flex justify-center gap-2">

                      {item.status === "PENDING" && (

                        <Button
                          size="sm"
                          onClick={() =>
                            markPaid(item.id)
                          }
                        >
                          Mark Paid
                        </Button>

                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          generateSlip(item.id)
                        }
                      >
                        Salary Slip
                      </Button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>    </div>

  );

}</table>