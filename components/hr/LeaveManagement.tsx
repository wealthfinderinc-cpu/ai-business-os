"use client";

import { useMemo, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { useLeaves } from "@/hooks/useLeaves";

import { LeaveService } from "@/services/leave.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Leave = {

  id: number;

  leaveType: string;

  startDate: string;

  endDate: string;

  reason: string;

  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED";

  employee: {

    id: number;

    employeeCode: string;

    fullName: string;

    department?: {

      name: string;

    };

  };

};

export default function LeaveManagement() {

  const queryClient =
    useQueryClient();

  const {

    data,

    isLoading,

    isError,

    refetch,

  } = useLeaves();

  const leaves: Leave[] =
    (data as any)?.data ??
    (Array.isArray(data)
      ? data
      : []);

  const [search, setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("");

  const filteredLeaves =
    useMemo(() => {

      return leaves.filter(
        (leave) => {

          const matchSearch =

            leave.employee.fullName
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            leave.employee.employeeCode
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchStatus =

            !statusFilter ||

            leave.status ===
              statusFilter;

          return (
            matchSearch &&
            matchStatus
          );

        }
      );

    }, [
      leaves,
      search,
      statusFilter,
    ]);

  async function approveLeave(
    id: number
  ) {

    try {

      await LeaveService.approve(
        id
      );

      toast.success(
        "Leave Approved"
      );

      queryClient.invalidateQueries({

        queryKey: [
          "leaves",
        ],

      });

    } catch {

      toast.error(
        "Unable to approve."
      );

    }

  }

  async function rejectLeave(
    id: number
  ) {

    try {

      await LeaveService.reject(
        id
      );

      toast.success(
        "Leave Rejected"
      );

      queryClient.invalidateQueries({

        queryKey: [
          "leaves",
        ],

      });

    } catch {

      toast.error(
        "Unable to reject."
      );

    }

  }

  if (isLoading) {

    return (

      <div className="rounded-xl border bg-white p-8">

        <div className="flex justify-center py-12">

          Loading Leave Requests...

        </div>

      </div>

    );

  }

  if (isError) {

    return (

      <div className="rounded-xl border bg-white p-8">

        <div className="space-y-4 text-center">

          <p>

            Unable to load leave requests.

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

            Leave Management

          </h2>

          <p className="text-slate-500">

            Total Requests :
            {" "}
            {filteredLeaves.length}

          </p>

        </div>

        <div className="flex gap-3">

          <Input
            className="w-72"
            placeholder="Search Employee..."
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
          />

          <select
            className="rounded-md border px-3"
            value={statusFilter}
            onChange={(e)=>
              setStatusFilter(
                e.target.value
              )
            }
          >

            <option value="">
              All Status
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="APPROVED">
              Approved
            </option>

            <option value="REJECTED">
              Rejected
            </option>

          </select>

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

              <th className="border px-4 py-3 text-center">
                Leave Type
              </th>

              <th className="border px-4 py-3 text-center">
                From
              </th>

              <th className="border px-4 py-3 text-center">
                To
              </th>

              <th className="border px-4 py-3 text-left">
                Reason
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

            {filteredLeaves.length === 0 ? (

              <tr>

                <td
                  colSpan={8}
                  className="py-12 text-center text-slate-500"
                >
                  No Leave Requests Found
                </td>

              </tr>

            ) : (

              filteredLeaves.map((leave) => (

                <tr
                  key={leave.id}
                  className="hover:bg-slate-50"
                >

                  <td className="border px-4 py-3">

                    <div>

                      <p className="font-medium">

                        {leave.employee.fullName}

                      </p>

                      <p className="text-xs text-slate-500">

                        {leave.employee.employeeCode}

                      </p>

                    </div>

                  </td>

                  <td className="border px-4 py-3">

                    {leave.employee.department?.name || "-"}

                  </td>

                  <td className="border px-4 py-3 text-center">

                    {leave.leaveType}

                  </td>

                  <td className="border px-4 py-3 text-center">

                    {new Date(
                      leave.startDate
                    ).toLocaleDateString()}

                  </td>

                  <td className="border px-4 py-3 text-center">

                    {new Date(
                      leave.endDate
                    ).toLocaleDateString()}

                  </td>

                  <td className="border px-4 py-3">

                    <div className="max-w-xs truncate">

                      {leave.reason}

                    </div>

                  </td>

                  <td className="border px-4 py-3 text-center">

                    {leave.status ===
                    "PENDING" && (

                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">

                        Pending

                      </span>

                    )}

                    {leave.status ===
                    "APPROVED" && (

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                        Approved

                      </span>

                    )}

                    {leave.status ===
                    "REJECTED" && (

                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">

                        Rejected

                      </span>

                    )}

                  </td>

                  <td className="border px-4 py-3">

                    <div className="flex justify-center gap-2">

                      {leave.status ===
                        "PENDING" && (

                        <>

                          <Button
                            size="sm"
                            onClick={() =>
                              approveLeave(
                                leave.id
                              )
                            }
                          >
                            Approve
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              rejectLeave(
                                leave.id
                              )
                            }
                          >
                            Reject
                          </Button>

                        </>

                      )}

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