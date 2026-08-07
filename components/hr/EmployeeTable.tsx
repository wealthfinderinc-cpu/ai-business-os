"use client";

import { useMemo, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { useEmployees } from "@/hooks/useEmployees";

import { EmployeeService } from "@/services/employee.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import EditEmployeeDialog from "./EditEmployeeDialog";
import EmployeeDetailsDrawer from "./EmployeeDetailsDrawer";

type Employee = {

  id: number;

  employeeCode: string;

  fullName: string;

  email?: string;

  mobile?: string;

  designation?: string;

  salary?: number;

  active: boolean;

  department?: {
    id: number;
    name: string;
  };

  createdAt?: string;

};

export default function EmployeeTable() {

  const queryClient =
    useQueryClient();

  const {

    data,

    isLoading,

    isError,

    refetch,

  } = useEmployees();

  const employees: Employee[] =
    (data as any)?.data ??
    (Array.isArray(data)
      ? data
      : []);

  const [search, setSearch] =
    useState("");

  const [editOpen, setEditOpen] =
    useState(false);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [selectedEmployee,
    setSelectedEmployee] =
    useState<Employee | null>(
      null
    );

  const filteredEmployees =
    useMemo(() => {

      const keyword =
        search
          .trim()
          .toLowerCase();

      if (!keyword)
        return employees;

      return employees.filter(
        (employee) =>

          employee.fullName
            .toLowerCase()
            .includes(keyword) ||

          employee.employeeCode
            .toLowerCase()
            .includes(keyword) ||

          employee.department?.name
            ?.toLowerCase()
            .includes(keyword)

      );

    }, [
      employees,
      search,
    ]);

  async function deleteEmployee(
    id: number
  ) {

    if (
      !window.confirm(
        "Delete employee?"
      )
    )
      return;

    try {

      await EmployeeService.delete(
        id
      );

      toast.success(
        "Employee deleted."
      );

      queryClient.invalidateQueries({

        queryKey: [
          "employees",
        ],

      });

    } catch {

      toast.error(
        "Delete failed."
      );

    }

  }

  function editEmployee(
    employee: Employee
  ) {

    setSelectedEmployee(
      employee
    );

    setEditOpen(true);

  }

  function viewEmployee(
    employee: Employee
  ) {

    setSelectedEmployee(
      employee
    );

    setDrawerOpen(true);

  }

  if (isLoading) {

    return (

      <div className="rounded-xl border bg-white p-8">

        <div className="flex justify-center py-12">

          Loading Employees...

        </div>

      </div>

    );

  }

  if (isError) {

    return (

      <div className="rounded-xl border bg-white p-8">

        <div className="space-y-4 text-center">

          <p>

            Unable to load employees.

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

    <>

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">

              Employees

            </h2>

            <p className="text-slate-500">

              Total Employees :
              {" "}
              {filteredEmployees.length}

            </p>

          </div>

          <Input
            className="w-80"
            placeholder="Search Employee..."
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">            <thead className="bg-slate-100">

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

                <th className="border px-4 py-3 text-left">
                  Designation
                </th>

                <th className="border px-4 py-3 text-center">
                  Salary
                </th>

                <th className="border px-4 py-3 text-center">
                  Status
                </th>

                <th className="border px-4 py-3 text-center">
                  Joined
                </th>

                <th className="border px-4 py-3 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredEmployees.length === 0 ? (

                <tr>

                  <td
                    colSpan={8}
                    className="py-12 text-center text-slate-500"
                  >

                    No Employees Found

                  </td>

                </tr>

              ) : (

                filteredEmployees.map((employee) => (

                  <tr
                    key={employee.id}
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() =>
                      viewEmployee(employee)
                    }
                  >

                    <td className="border px-4 py-3 font-medium">

                      {employee.employeeCode}

                    </td>

                    <td className="border px-4 py-3">

                      <div>

                        <p className="font-medium">

                          {employee.fullName}

                        </p>

                        <p className="text-xs text-slate-500">

                          {employee.email || "-"}

                        </p>

                      </div>

                    </td>

                    <td className="border px-4 py-3">

                      {employee.department?.name || "-"}

                    </td>

                    <td className="border px-4 py-3">

                      {employee.designation || "-"}

                    </td>

                    <td className="border px-4 py-3 text-center font-semibold text-green-700">

                      ₹
                      {employee.salary?.toLocaleString() ||
                        "0"}

                    </td>

                    <td className="border px-4 py-3 text-center">

                      {employee.active ? (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                          Active

                        </span>

                      ) : (

                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">

                          Inactive

                        </span>

                      )}

                    </td>

                    <td className="border px-4 py-3 text-center">

                      {employee.createdAt
                        ? new Date(
                            employee.createdAt
                          ).toLocaleDateString()
                        : "-"}

                    </td>

                    <td
                      className="border px-4 py-3"
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >

                      <div className="flex justify-center gap-2">

                        <Button
                          size="sm"
                          onClick={() =>
                            editEmployee(employee)
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            deleteEmployee(employee.id)
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

        </div>

      </div>      <EditEmployeeDialog
        open={editOpen}
        employee={selectedEmployee}
        onClose={() => {

          setEditOpen(false);

          setSelectedEmployee(null);

          queryClient.invalidateQueries({
            queryKey: ["employees"],
          });

        }}
      />

      <EmployeeDetailsDrawer
        open={drawerOpen}
        employee={selectedEmployee}
        onClose={() => {

          setDrawerOpen(false);

          setSelectedEmployee(null);

        }}
      />

    </>

  );

}</table>