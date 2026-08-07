"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AttendanceForm() {
  const [employee, setEmployee] = useState("");
  const [status, setStatus] = useState("Present");

  function saveAttendance() {
    toast.success("Attendance Saved");

    setEmployee("");
    setStatus("Present");
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Mark Attendance
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <input
          className="rounded-md border p-2"
          placeholder="Employee Name"
          value={employee}
          onChange={(e) =>
            setEmployee(e.target.value)
          }
        />

        <select
          className="rounded-md border p-2"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option>Present</option>
          <option>Absent</option>
          <option>Leave</option>
          <option>Half Day</option>
        </select>

      </div>

      <Button
        className="mt-6 w-full"
        onClick={saveAttendance}
      >
        Save Attendance
      </Button>

    </div>
  );
}