"use client";

import { Button } from "@/components/ui/button";

export default function DeleteEmployeeDialog() {
  return (
    <div className="rounded-xl border bg-white p-10 text-center shadow">

      <h2 className="text-2xl font-bold text-red-600">
        Delete Employee
      </h2>

      <p className="mt-3 text-slate-500">
        Delete confirmation dialog will be connected with Database in the next phase.
      </p>

      <Button
        variant="destructive"
        className="mt-6"
      >
        Delete
      </Button>

    </div>
  );
}