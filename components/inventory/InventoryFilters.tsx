"use client";

import { Input } from "@/components/ui/input";

type Props = {
  search?: string;
  setSearch?: (value: string) => void;
};

export default function InventoryFilters({
  search = "",
  setSearch = () => {},
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <div className="grid grid-cols-3 gap-4">

        <Input
          placeholder="Search Product..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select className="rounded-md border p-2">

          <option>All Categories</option>

          <option>Nutrition</option>

          <option>Personal Care</option>

          <option>Home Care</option>

          <option>Agriculture</option>

        </select>

        <select className="rounded-md border p-2">

          <option>All Stock</option>

          <option>In Stock</option>

          <option>Low Stock</option>

          <option>Out Of Stock</option>

        </select>

      </div>

    </div>
  );
}