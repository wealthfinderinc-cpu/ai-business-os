"use client";

import { Button } from "@/components/ui/button";

type Expense = {
  id: number;
  title: string;
  category: string;
  amount: number;
  notes?: string | null;
  expenseDate: string;
  createdAt?: string;
};

type Props = {
  open: boolean;
  expense: Expense | null;
  onClose: () => void;
};

export default function ExpenseDetailsDrawer({
  open,
  expense,
  onClose,
}: Props) {

  if (!open || !expense) {
    return null;
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  }

  return (

    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">

      <div className="h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl">

        <div className="sticky top-0 border-b bg-white p-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">

                Expense Details

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                Expense Information

              </p>

            </div>

            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>

          </div>

        </div>

        <div className="space-y-6 p-6">

          <div className="rounded-xl border p-5">

            <h3 className="mb-4 font-semibold">

              Expense Information

            </h3>

            <div className="space-y-4">

              <div>

                <p className="text-xs uppercase text-slate-500">
                  Title
                </p>

                <p className="font-semibold">
                  {expense.title}
                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">
                  Category
                </p>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

                  {expense.category}

                </span>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">
                  Amount
                </p>

                <p className="text-xl font-bold text-red-600">

                  ₹{expense.amount.toFixed(2)}

                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">
                  Expense Date
                </p>

                <p>

                  {new Date(
                    expense.expenseDate
                  ).toLocaleDateString()}

                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">
                  Created On
                </p>

                <p>

                  {expense.createdAt
                    ? new Date(
                        expense.createdAt
                      ).toLocaleString()
                    : "-"}

                </p>

              </div>              <div>

                <p className="text-xs uppercase text-slate-500">
                  Notes
                </p>

                <p className="whitespace-pre-wrap">
                  {expense.notes || "-"}
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-xl border p-5">

            <h3 className="mb-4 font-semibold">
              Quick Actions
            </h3>

            <div className="grid gap-3">

              <Button
                variant="outline"
                onClick={() =>
                  copy(expense.title)
                }
              >
                Copy Expense Title
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  copy(expense.category)
                }
              >
                Copy Category
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  copy(
                    expense.amount.toFixed(2)
                  )
                }
              >
                Copy Amount
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  window.print()
                }
              >
                Print Expense
              </Button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}