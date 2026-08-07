"use client";

import { Input } from "@/components/ui/input";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  priority: string;
  setPriority: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;
};

export default function TaskFilters({
  search,
  setSearch,
  priority,
  setPriority,
  status,
  setStatus,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <div className="grid grid-cols-3 gap-4">

        <Input
          placeholder="Search Task..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="rounded-md border p-2"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
        >
          <option value="">All Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Urgent</option>
        </select>

        <select
          className="rounded-md border p-2"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="">All Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

      </div>

    </div>
  );
}