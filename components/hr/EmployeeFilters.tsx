"use client";

import { Input } from "@/components/ui/input";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  department: string;
  setDepartment: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;
};

export default function EmployeeFilters({
  search,
  setSearch,
  department,
  setDepartment,
  status,
  setStatus,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <div className="grid grid-cols-3 gap-4">

        <Input
          placeholder="Search Employee..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="rounded-md border p-2"
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
        >
          <option value="">
            All Departments
          </option>

          <option value="Sales">
            Sales
          </option>

          <option value="Marketing">
            Marketing
          </option>

          <option value="Accounts">
            Accounts
          </option>

          <option value="HR">
            HR
          </option>

        </select>

        <select
          className="rounded-md border p-2"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="">
            All Status
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>

        </select>

      </div>

    </div>
  );
}