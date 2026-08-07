"use client";

import { Button } from "@/components/ui/button";

export default function TaskTable() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Task List
      </h2>

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-3 text-left">
              Task
            </th>

            <th className="p-3 text-left">
              Assigned To
            </th>

            <th className="p-3 text-left">
              Due Date
            </th>

            <th className="p-3 text-left">
              Priority
            </th>

            <th className="p-3 text-left">
              Status
            </th>

            <th className="p-3 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          <tr className="border-t">

            <td className="p-3">
              Demo Task
            </td>

            <td className="p-3">
              Admin
            </td>

            <td className="p-3">
              -
            </td>

            <td className="p-3">

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                Medium
              </span>

            </td>

            <td className="p-3">

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                Pending
              </span>

            </td>

            <td className="p-3">

              <div className="flex justify-center gap-2">

                <Button size="sm">
                  View
                </Button>

                <Button size="sm">
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                >
                  Delete
                </Button>

              </div>

            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}