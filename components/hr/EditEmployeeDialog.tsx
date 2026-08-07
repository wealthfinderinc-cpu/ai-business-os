"use client";

import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { EmployeeService } from "@/services/employee.service";

import { useDepartments } from "@/hooks/useDepartments";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Employee = {
  id: number;
  employeeCode: string;
  fullName: string;
  email?: string | null;
  mobile?: string | null;
  designation?: string | null;
  departmentId?: number | null;
  salary?: number | null;
  active: boolean;
};

type Props = {
  open: boolean;
  employee: Employee | null;
  onClose: () => void;
};

export default function EditEmployeeDialog({
  open,
  employee,
  onClose,
}: Props) {

  const queryClient =
    useQueryClient();

  const {
    data: departments,
  } = useDepartments();

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({

      employeeCode: "",

      fullName: "",

      email: "",

      mobile: "",

      designation: "",

      departmentId: "",

      salary: 0,

      active: true,

    });

  useEffect(() => {

    if (!employee)
      return;

    setForm({

      employeeCode:
        employee.employeeCode,

      fullName:
        employee.fullName,

      email:
        employee.email ?? "",

      mobile:
        employee.mobile ?? "",

      designation:
        employee.designation ?? "",

      departmentId:
        String(
          employee.departmentId ?? ""
        ),

      salary:
        employee.salary ?? 0,

      active:
        employee.active,

    });

  }, [employee]);

  if (!open || !employee)
    return null;

  async function updateEmployee() {

    try {

      setSaving(true);

      await EmployeeService.update(

        employee.id,

        {

          ...form,

          departmentId:
            Number(
              form.departmentId
            ),

        }

      );

      toast.success(
        "Employee updated successfully."
      );

      queryClient.invalidateQueries({

        queryKey: [
          "employees",
        ],

      });

      onClose();

    } catch {

      toast.error(
        "Unable to update employee."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">

            Edit Employee

          </h2>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <Input
            placeholder="Employee Code"
            value={form.employeeCode}
            onChange={(e) =>
              setForm({
                ...form,
                employeeCode:
                  e.target.value,
              })
            }
          />

          <Input
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) =>
              setForm({
                ...form,
                fullName:
                  e.target.value,
              })
            }
          />

          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target.value,
              })
            }
          />

          <Input
            placeholder="Mobile"
            value={form.mobile}
            onChange={(e) =>
              setForm({
                ...form,
                mobile:
                  e.target.value,
              })
            }
          />

          <select
            className="rounded-md border p-3"
            value={form.departmentId}
            onChange={(e) =>
              setForm({
                ...form,
                departmentId:
                  e.target.value,
              })
            }
          >

            <option value="">
              Select Department
            </option>

            {(departments as any)?.map(
              (dept: any) => (

                <option
                  key={dept.id}
                  value={dept.id}
                >
                  {dept.name}
                </option>

              )
            )}

          </select>

          <Input
            placeholder="Designation"
            value={form.designation}
            onChange={(e) =>
              setForm({
                ...form,
                designation:
                  e.target.value,
              })
            }
          />          <Input
            type="number"
            placeholder="Salary"
            value={form.salary}
            onChange={(e) =>
              setForm({
                ...form,
                salary: Number(
                  e.target.value
                ),
              })
            }
          />

          <label className="flex items-center gap-3 rounded-md border p-3">

            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) =>
                setForm({
                  ...form,
                  active:
                    e.target.checked,
                })
              }
            />

            Active Employee

          </label>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <Button
            variant="outline"
            disabled={saving}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            disabled={saving}
            onClick={updateEmployee}
          >
            {saving
              ? "Updating..."
              : "Update Employee"}
          </Button>

        </div>

      </div>

    </div>

  );

}