"use client";

import { Bell } from "lucide-react";

export default function TaskReminder() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <div className="mb-4 flex items-center gap-3">

        <Bell className="text-yellow-500" />

        <h2 className="text-2xl font-bold">
          Upcoming Reminders
        </h2>

      </div>

      <div className="space-y-3">

        <div className="rounded-lg border p-4">
          <p className="font-semibold">
            Demo Follow-up
          </p>

          <p className="text-sm text-slate-500">
            Tomorrow 10:00 AM
          </p>
        </div>

      </div>

    </div>
  );
}