"use client";

import { useMemo, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { useDepartments } from "@/hooks/useDepartments";

import { DepartmentService } from "@/services/department.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Department = {

  id: number;

  name: string;

  description?: string;

  head?: string;

  employees?: {
    id: number;
  }[];

};

export default function DepartmentTable() {

  const queryClient =
    useQueryClient();

  const {

    data,

    isLoading,

    isError,

    refetch,

  } = useDepartments();

  const departments: Department[] =
    (data as any)?.data ??
    (Array.isArray(data)
      ? data
      : []);

  const [search, setSearch] =
    useState("");

  const filteredDepartments =
    useMemo(() => {

      const keyword =
        search.trim().toLowerCase();

      if (!keyword)
        return departments;

      return departments.filter(
        (department) =>

          department.name
            .toLowerCase()
            .includes(keyword) ||

          department.description
            ?.toLowerCase()
            .includes(keyword)

      );

    }, [
      departments,
      search,
    ]);

  async function deleteDepartment(
    id: number
  ) {

    if (
      !window.confirm(
        "Delete department?"
      )
    )
      return;

    try {

      await DepartmentService.delete(
        id
      );

      toast.success(
        "Department deleted."
      );

      queryClient.invalidateQueries({

        queryKey: [
          "departments",
        ],

      });

    } catch {

      toast.error(
        "Unable to delete department."
      );

    }

  }

  if (isLoading) {

    return (

      <div className="rounded-xl border bg-white p-8">

        <div className="flex justify-center py-12">

          Loading Departments...

        </div>

      </div>

    );

  }

  if (isError) {

    return (

      <div className="rounded-xl border bg-white p-8">

        <div className="space-y-4 text-center">

          <p>

            Unable to load departments.

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

            Departments

          </h2>

          <p className="text-slate-500">

            Total Departments :
            {" "}
            {filteredDepartments.length}

          </p>

        </div>

        <Input
          className="w-80"
          placeholder="Search Department..."
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full text-sm">          <thead className="bg-slate-100">

            <tr>

              <th className="border px-4 py-3 text-left">
                Department
              </th>

              <th className="border px-4 py-3 text-left">
                Description
              </th>

              <th className="border px-4 py-3 text-left">
                Department Head
              </th>

              <th className="border px-4 py-3 text-center">
                Employees
              </th>

              <th className="border px-4 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredDepartments.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="py-12 text-center text-slate-500"
                >
                  No Departments Found
                </td>

              </tr>

            ) : (

              filteredDepartments.map((department) => (

                <tr
                  key={department.id}
                  className="hover:bg-slate-50"
                >

                  <td className="border px-4 py-3 font-medium">

                    {department.name}

                  </td>

                  <td className="border px-4 py-3">

                    {department.description || "-"}

                  </td>

                  <td className="border px-4 py-3">

                    {department.head || "-"}

                  </td>

                  <td className="border px-4 py-3 text-center">

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

                      {department.employees?.length ?? 0}

                    </span>

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
                          deleteDepartment(
                            department.id
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

}</table>