"use client";

import { useQuery } from "@tanstack/react-query";

type Product = {
  id: number;
  stock: number;
  minStock: number;
  active: boolean;
  mrp: number;
};

export default function ProductStats() {
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

  const totalProducts = data.length;

  const activeProducts =
    data.filter((p) => p.active).length;

  const lowStock =
    data.filter(
      (p) => p.stock <= p.minStock
    ).length;

  const totalValue = data.reduce(
    (sum, p) => sum + p.stock * p.mrp,
    0
  );

  const cards = [
    {
      title: "Products",
      value: totalProducts,
      color: "#2563eb",
    },
    {
      title: "Active",
      value: activeProducts,
      color: "#16a34a",
    },
    {
      title: "Low Stock",
      value: lowStock,
      color: "#dc2626",
    },
    {
      title: "Inventory Value",
      value: `₹ ${totalValue.toLocaleString()}`,
      color: "#7c3aed",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-5">

      {cards.map((card) => (

        <div
          key={card.title}
          className="rounded-xl bg-white p-6 shadow"
        >

          <p className="text-slate-500">
            {card.title}
          </p>

          <h2
            className="mt-3 text-3xl font-bold"
            style={{
              color: card.color,
            }}
          >
            {card.value}
          </h2>

        </div>

      ))}

    </div>
  );
}