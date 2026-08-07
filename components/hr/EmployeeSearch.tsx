"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function EmployeeSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative w-full">

      <Search
        size={18}
        className="absolute left-3 top-3 text-slate-400"
      />

      <Input
        className="pl-10"
        placeholder="Search Employee..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />

    </div>
  );
}