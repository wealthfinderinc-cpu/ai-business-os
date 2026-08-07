"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  expenseSchema,
  ExpenseFormData,
} from "@/app/validators/expense.schema";

import { FinanceService } from "@/services/finance.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ExpenseForm() {

  const queryClient =
    useQueryClient();

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
    useForm<ExpenseFormData>({
      resolver:
        zodResolver(
          expenseSchema
        ),
    });

  async function onSubmit(
    data: ExpenseFormData
  ) {

    try {

      setSaving(true);

      await FinanceService.createExpense(
        data
      );

      toast.success(
        "Expense added successfully."
      );

      queryClient.invalidateQueries({
        queryKey: [
          "finance",
        ],
      });

      reset();

    } catch (error: any) {

      toast.error(
        error?.message ??
        "Unable to save expense."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          Add Expense

        </h2>

        <p className="mt-2 text-slate-500">

          Record a business expense.

        </p>

      </div>

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="space-y-5"
      >

        <div>

          <label className="mb-2 block text-sm font-medium">

            Expense Title

          </label>

          <Input
            placeholder="Office Rent"
            {...register("title")}
          />

          {errors.title && (

            <p className="mt-1 text-sm text-red-500">

              {errors.title.message}

            </p>

          )}

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">

            Category

          </label>

          <select
            className="w-full rounded-md border p-3"
            {...register("category")}
          >

            <option value="">

              Select Category

            </option>

            <option value="Office">

              Office

            </option>

            <option value="Marketing">

              Marketing

            </option>

            <option value="Salary">

              Salary

            </option>

            <option value="Travel">

              Travel

            </option>

            <option value="Utilities">

              Utilities

            </option>

            <option value="Misc">

              Miscellaneous

            </option>

          </select>

          {errors.category && (

            <p className="mt-1 text-sm text-red-500">

              {errors.category.message}

            </p>

          )}

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium">

              Amount

            </label>

            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("amount", {
                valueAsNumber: true,
              })}
            />

            {errors.amount && (

              <p className="mt-1 text-sm text-red-500">

                {errors.amount.message}

              </p>

            )}

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Expense Date

            </label>

            <Input
              type="date"
              {...register("expenseDate")}
            />

            {errors.expenseDate && (

              <p className="mt-1 text-sm text-red-500">

                {errors.expenseDate.message}

              </p>

            )}

          </div>

        </div>        <div>

          <label className="mb-2 block text-sm font-medium">

            Notes

          </label>

          <textarea
            rows={5}
            className="w-full rounded-md border p-3"
            placeholder="Additional notes..."
            {...register("notes")}
          />

          {errors.notes && (

            <p className="mt-1 text-sm text-red-500">

              {errors.notes.message}

            </p>

          )}

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
              : "Save Expense"}
          </Button>

        </div>

      </form>

    </div>

  );

}