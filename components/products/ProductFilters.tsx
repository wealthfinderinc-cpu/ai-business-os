"use client";

import { Input } from "@/components/ui/input";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  stock: string;
  setStock: (value: string) => void;
};

export default function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
  stock,
  setStock,
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

        <select
          className="rounded-md border p-2"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="">
            All Categories
          </option>

          <option value="Nutrition">
            Nutrition
          </option>

          <option value="Personal Care">
            Personal Care
          </option>

          <option value="Home Care">
            Home Care
          </option>

          <option value="Agriculture">
            Agriculture
          </option>

          <option value="Others">
            Others
          </option>

        </select>

        <select
          className="rounded-md border p-2"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        >
          <option value="">
            All Stock
          </option>

          <option value="instock">
            In Stock
          </option>

          <option value="low">
            Low Stock
          </option>

          <option value="out">
            Out Of Stock
          </option>

        </select>

      </div>

    </div>
  );
}