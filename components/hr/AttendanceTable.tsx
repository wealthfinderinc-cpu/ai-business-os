"use client";

import { useMemo, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { useAttendance } from "@/hooks/useAttendance";

import { AttendanceService } from "@/services/attendance.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Attendance = {

  id: number;

  date: string;

  status:
    | "PRESENT"
    | "ABSENT"
    | "LEAVE"
    | "HALF_DAY";

  employee: {

    id: number;

    employeeCode: string;

    fullName: string;

    department?: {
      name: string;
    };

  };

};

export default function AttendanceTable() {

  const queryClient =
    useQueryClient();

  const {

    data,

    isLoading,

    isError,

    refetch,

  } = useAttendance();

  const attendance: Attendance[] =
    (data as any)?.data ??
    (Array.isArray(data)
      ? data
      : []);

  const [search, setSearch] =
    useState("");

  const [dateFilter, setDateFilter] =
    useState("");

  const filteredAttendance =
    useMemo(() => {

      return attendance.filter(
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

          const matchDate =
            !dateFilter ||

            item.date.slice(0, 10) ===
              dateFilter;

          return (
            matchSearch &&
            matchDate
          );

        }
      );

    }, [
      attendance,
      search,
      dateFilter,
    ]);

  async function deleteAttendance(
    id: number
  ) {

    if (
      !window.confirm(
        "Delete attendance?"
      )
    )
      return;

    try {

      await AttendanceService.delete(
        id
      );

      toast.success(
        "Attendance deleted."
      );

      queryClient.invalidateQueries({

        queryKey: [
          "attendance",
        ],

      });

    } catch {

      toast.error(
        "Delete failed."
      );

    }

  }

  if (isLoading) {

    return (

      <div className="rounded-xl border bg-white p-8">

        <div className="flex justify-center py-12">

          Loading Attendance...

        </div>

      </div>

    );

  }

  if (isError) {

    return (

      <div className="rounded-xl border bg-white p-8">

        <div className="space-y-4 text-center">

          <p>

            Unable to load attendance.

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

            Attendance

          </h2>

          <p className="text-slate-500">

            Total Records :
            {" "}
            {filteredAttendance.length}

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
            type="date"
            value={dateFilter}
            onChange={(e) =>
              setDateFilter(
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
                Employee Code
              </th>

              <th className="border px-4 py-3 text-left">
                Employee Name
              </th>

              <th className="border px-4 py-3 text-left">
                Department
              </th>

              <th className="border px-4 py-3 text-center">
                Attendance Date
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

            {filteredAttendance.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-12 text-center text-slate-500"
                >
                  No Attendance Records
                </td>

              </tr>

            ) : (

              filteredAttendance.map((item) => (

                <tr
                  key={item.id}
                  className="hover:bg-slate-50"
                >

                  <td className="border px-4 py-3 font-medium">

                    {item.employee.employeeCode}

                  </td>

                  <td className="border px-4 py-3">

                    {item.employee.fullName}

                  </td>

                  <td className="border px-4 py-3">

                    {item.employee.department?.name || "-"}

                  </td>

                  <td className="border px-4 py-3 text-center">

                    {new Date(
                      item.date
                    ).toLocaleDateString()}

                  </td>

                  <td className="border px-4 py-3 text-center">

                    {item.status === "PRESENT" && (

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Present
                      </span>

                    )}

                    {item.status === "ABSENT" && (

                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        Absent
                      </span>

                    )}

                    {item.status === "LEAVE" && (

                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        Leave
                      </span>

                    )}

                    {item.status === "HALF_DAY" && (

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        Half Day
                      </span>

                    )}

                  </td>

                  <td className="border px-4 py-3">

                    <div className="flex justify-center gap-2">

                      <Button
                        size="sm"
                        variant="outline"
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          deleteAttendance(
                            item.id
                          )
                        }
                      >
                        Delete
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

}