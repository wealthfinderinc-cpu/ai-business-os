"use client";

import { Package } from "lucide-react";

type Product = {
  productCode: string;
  name: string;
  category: string;
  mrp: number;
  dp: number;
  stock: number;
  active: boolean;
  image?: string;
};

type Props = {
  product: Product;
};

export default function ProductCard({
  product,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg">

      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="flex h-48 items-center justify-center bg-slate-100">
          <Package
            size={60}
            className="text-slate-400"
          />
        </div>
      )}

      <div className="space-y-2 p-4">

        <h3 className="text-lg font-bold">
          {product.name}
        </h3>

        <p className="text-sm text-slate-500">
          {product.productCode}
        </p>

        <span className="rounded bg-slate-100 px-2 py-1 text-xs">
          {product.category}
        </span>

        <div className="mt-3 flex justify-between">

          <span className="font-semibold">
            ₹ {product.dp}
          </span>

          <span className="text-slate-500">
            Stock : {product.stock}
          </span>

        </div>

      </div>

    </div>
  );
}