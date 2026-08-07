"use client";

import { useMemo, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { useFinance } from "@/hooks/useFinance";

import { FinanceService } from "@/services/finance.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import EditExpenseDialog from "./EditExpenseDialog";
import ExpenseDetailsDrawer from "./ExpenseDetailsDrawer";

type Expense = {

  id: number;

  title: string;

  category: string;

  amount: number;

  notes?: string | null;

  expenseDate: string;

  createdAt?: string;

};

export default function ExpenseTable() {

  const queryClient =
    useQueryClient();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useFinance();

  const expenses: Expense[] =
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

  const [selectedExpense,
    setSelectedExpense] =
    useState<Expense | null>(
      null
    );

  const filteredExpenses =
    useMemo(() => {

      const keyword =
        search.trim().toLowerCase();

      if (!keyword)
        return expenses;

      return expenses.filter(
        (expense) =>

          expense.title
            .toLowerCase()
            .includes(keyword) ||

          expense.category
            .toLowerCase()
            .includes(keyword)

      );

    }, [
      expenses,
      search,
    ]);

  async function deleteExpense(
    id: number
  ) {

    if (
      !window.confirm(
        "Delete Expense?"
      )
    )
      return;

    try {

      await FinanceService.deleteExpense(
        id
      );

      toast.success(
        "Expense deleted."
      );

      queryClient.invalidateQueries({
        queryKey: [
          "finance",
        ],
      });

    } catch {

      toast.error(
        "Delete failed."
      );

    }

  }

  function editExpense(
    expense: Expense
  ) {

    setSelectedExpense(
      expense
    );

    setEditOpen(true);

  }

  function viewExpense(
    expense: Expense
  ) {

    setSelectedExpense(
      expense
    );

    setDrawerOpen(true);

  }

  if (isLoading) {

    return (

      <div className="rounded-xl border bg-white p-8">

        <div className="flex justify-center py-12">

          Loading Expenses...

        </div>

      </div>

    );

  }

  if (isError) {

    return (

      <div className="rounded-xl border bg-white p-8">

        <div className="space-y-4 text-center">

          <p>

            Unable to load expenses.

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

              Expense Management

            </h2>

            <p className="text-slate-500">

              Total Expenses :
              {" "}
              {filteredExpenses.length}

            </p>

          </div>

          <Input
            className="w-80"
            placeholder="Search Expense..."
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
                  Title
                </th>

                <th className="border px-4 py-3 text-left">
                  Category
                </th>

                <th className="border px-4 py-3 text-right">
                  Amount
                </th>

                <th className="border px-4 py-3 text-center">
                  Expense Date
                </th>

                <th className="border px-4 py-3 text-center">
                  Created
                </th>

                <th className="border px-4 py-3 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredExpenses.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="py-12 text-center text-slate-500"
                  >

                    No Expense Found

                  </td>

                </tr>

              ) : (

                filteredExpenses.map((expense) => (

                  <tr
                    key={expense.id}
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() =>
                      viewExpense(expense)
                    }
                  >

                    <td className="border px-4 py-3 font-medium">

                      {expense.title}

                    </td>

                    <td className="border px-4 py-3">

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">

                        {expense.category}

                      </span>

                    </td>

                    <td className="border px-4 py-3 text-right font-semibold text-red-600">

                      ₹{expense.amount.toFixed(2)}

                    </td>

                    <td className="border px-4 py-3 text-center">

                      {new Date(
                        expense.expenseDate
                      ).toLocaleDateString()}

                    </td>

                    <td className="border px-4 py-3 text-center">

                      {expense.createdAt
                        ? new Date(
                            expense.createdAt
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
                            editExpense(expense)
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            deleteExpense(expense.id)
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

      </div>      <EditExpenseDialog
        open={editOpen}
        expense={selectedExpense}
        onClose={() => {

          setEditOpen(false);

          setSelectedExpense(null);

          queryClient.invalidateQueries({
            queryKey: ["finance"],
          });

        }}
      />

      <ExpenseDetailsDrawer
        open={drawerOpen}
        expense={selectedExpense}
        onClose={() => {

          setDrawerOpen(false);

          setSelectedExpense(null);

        }}
      />

    </>

  );

}