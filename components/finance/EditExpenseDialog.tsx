"use client";

import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { FinanceService } from "@/services/finance.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Expense = {
  id: number;
  title: string;
  category: string;
  amount: number;
  notes?: string | null;
  expenseDate: string;
};

type Props = {
  open: boolean;
  expense: Expense | null;
  onClose: () => void;
};

export default function EditExpenseDialog({
  open,
  expense,
  onClose,
}: Props) {

  const queryClient =
    useQueryClient();

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({

      title: "",

      category: "",

      amount: 0,

      expenseDate: "",

      notes: "",

    });

  useEffect(() => {

    if (!expense)
      return;

    setForm({

      title:
        expense.title,

      category:
        expense.category,

      amount:
        expense.amount,

      expenseDate:
        expense.expenseDate
          ?.slice(0, 10),

      notes:
        expense.notes ?? "",

    });

  }, [expense]);

  if (!open || !expense)
    return null;

  async function updateExpense() {

    try {

      setSaving(true);

      await FinanceService.updateExpense(

        expense.id,

        form

      );

      toast.success(
        "Expense updated successfully."
      );

      queryClient.invalidateQueries({

        queryKey: [
          "finance",
        ],

      });

      onClose();

    } catch {

      toast.error(
        "Unable to update expense."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">

            Edit Expense

          </h2>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>

        </div>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block text-sm font-medium">

              Expense Title

            </label>

            <Input
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title:
                    e.target.value,
                })
              }
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Category

            </label>

            <select
              className="w-full rounded-md border p-3"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category:
                    e.target.value,
                })
              }
            >

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

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium">

                Amount

              </label>

              <Input
                type="number"
                value={form.amount}
                onChange={(e) =>
                  setForm({
                    ...form,
                    amount:
                      Number(
                        e.target.value
                      ),
                  })
                }
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">

                Expense Date

              </label>

              <Input
                type="date"
                value={form.expenseDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    expenseDate:
                      e.target.value,
                  })
                }
              />

            </div>

          </div>          <div>

            <label className="mb-2 block text-sm font-medium">

              Notes

            </label>

            <textarea
              rows={5}
              className="w-full rounded-md border p-3"
              placeholder="Expense Notes..."
              value={form.notes}
              onChange={(e) =>
                setForm({
                  ...form,
                  notes: e.target.value,
                })
              }
            />

          </div>

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
            onClick={updateExpense}
          >
            {saving
              ? "Updating..."
              : "Update Expense"}
          </Button>

        </div>

      </div>

    </div>

  );

}