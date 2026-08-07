"use client";

import { Button } from "@/components/ui/button";

export default function TaskDetails() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Task Details
        </h2>

        <Button variant="outline">
          Close
        </Button>

      </div>

      <div className="space-y-4">

        <p>
          <strong>Title:</strong> Demo Task
        </p>

        <p>
          <strong>Assigned To:</strong> Admin
        </p>

        <p>
          <strong>Status:</strong> Pending
        </p>

        <p>
          <strong>Priority:</strong> Medium
        </p>

      </div>

    </div>
  );
}