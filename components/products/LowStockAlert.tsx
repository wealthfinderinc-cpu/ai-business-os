"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";

type Product = {
  id: number;
  name: string;
  stock: number;
  minStock: number;
};

export default function LowStockAlert() {
  const { data = [] } = useQuery<Product[]>({
    queryKey: ["products"],

    queryFn: async () => {
      const res = await fetch("/api/products");

      if (!res.ok) {
        throw new Error("Unable to load products");
      }

      return res.json();
    },
  });

  const lowStock = data.filter(
    (p) => p.stock <= p.minStock
  );

  if (lowStock.length === 0) return null;

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-5">

      <div className="mb-4 flex items-center gap-3">

        <AlertTriangle className="text-red-600" />

        <h2 className="text-xl font-bold text-red-700">
          Low Stock Alert
        </h2>

      </div>

      <div className="space-y-3">

        {lowStock.map((product) => (

          <div
            key={product.id}
            className="flex items-center justify-between rounded-lg border bg-white p-3"
          >

            <div>

              <p className="font-semibold">
                {product.name}
              </p>

              <p className="text-sm text-slate-500">
                Minimum Required : {product.minStock}
              </p>

            </div>

            <span className="rounded-full bg-red-100 px-3 py-1 font-semibold text-red-600">
              Stock : {product.stock}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}