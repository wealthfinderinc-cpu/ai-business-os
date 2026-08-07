"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  employeeSchema,
  EmployeeFormData,
} from "@/app/validators/employee.schema";

import { EmployeeService } from "@/services/employee.service";

import { useDepartments } from "@/hooks/useDepartments";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EmployeeForm() {

  const queryClient =
    useQueryClient();

  const {
    data: departments,
  } = useDepartments();

  const [saving, setSaving] =
    useState(false);

  const {

    register,

    handleSubmit,

    reset,

    formState: {
      errors,
    },

  } =
    useForm<EmployeeFormData>({
      resolver:
        zodResolver(
          employeeSchema
        ),
    });

  async function onSubmit(
    data: EmployeeFormData
  ) {

    try {

      setSaving(true);

      await EmployeeService.create(
        data
      );

      toast.success(
        "Employee created successfully."
      );

      queryClient.invalidateQueries({

        queryKey: [
          "employees",
        ],

      });

      reset();

    } catch (error: any) {

      toast.error(
        error?.message ??
        "Unable to save employee."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          Add Employee

        </h2>

        <p className="mt-2 text-slate-500">

          Register a new employee.

        </p>

      </div>

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="space-y-5"
      >

        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium">

              Employee Code

            </label>

            <Input
              placeholder="EMP001"
              {...register(
                "employeeCode"
              )}
            />

            {errors.employeeCode && (

              <p className="mt-1 text-sm text-red-500">

                {errors.employeeCode.message}

              </p>

            )}

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Full Name

            </label>

            <Input
              placeholder="Employee Name"
              {...register(
                "fullName"
              )}
            />

            {errors.fullName && (

              <p className="mt-1 text-sm text-red-500">

                {errors.fullName.message}

              </p>

            )}

          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium">

              Email

            </label>

            <Input
              type="email"
              placeholder="employee@email.com"
              {...register("email")}
            />

            {errors.email && (

              <p className="mt-1 text-sm text-red-500">

                {errors.email.message}

              </p>

            )}

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Mobile

            </label>

            <Input
              placeholder="9876543210"
              {...register("mobile")}
            />

            {errors.mobile && (

              <p className="mt-1 text-sm text-red-500">

                {errors.mobile.message}

              </p>

            )}

          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium">

              Department

            </label>

            <select
              className="w-full rounded-md border p-3"
              {...register(
                "departmentId",
                {
                  valueAsNumber: true,
                }
              )}
            >

              <option value="">

                Select Department

              </option>

              {(departments as any)?.map(
                (department: any) => (

                  <option
                    key={department.id}
                    value={department.id}
                  >

                    {department.name}

                  </option>

                )
              )}

            </select>

            {errors.departmentId && (

              <p className="mt-1 text-sm text-red-500">

                {errors.departmentId.message}

              </p>

            )}

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Designation

            </label>

            <Input
              placeholder="Sales Executive"
              {...register(
                "designation"
              )}
            />

            {errors.designation && (

              <p className="mt-1 text-sm text-red-500">

                {errors.designation.message}

              </p>

            )}

          </div>

        </div>        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium">

              Salary

            </label>

            <Input
              type="number"
              placeholder="25000"
              {...register("salary", {
                valueAsNumber: true,
              })}
            />

            {errors.salary && (

              <p className="mt-1 text-sm text-red-500">

                {errors.salary.message}

              </p>

            )}

          </div>

          <div className="flex items-end">

            <label className="flex items-center gap-3 rounded-md border p-3 w-full">

              <input
                type="checkbox"
                {...register("active")}
                className="h-4 w-4"
              />

              <span className="text-sm font-medium">

                Active Employee

              </span>

            </label>

          </div>

        </div>

        <div className="flex justify-end gap-3 pt-4">

          <Button
            type="button"
            variant="outline"
            disabled={saving}
            onClick={() => reset()}
          >
            Reset
          </Button>

          <Button
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Employee"}
          </Button>

        </div>

      </form>

    </div>

  );

}