"use client";

import { Clock3 } from "lucide-react";

type Movement = {
  id: number;
  product: string;
  type: "IN" | "OUT";
  quantity: number;
  date: string;
};

const movements: Movement[] = [
  {
    id: 1,
    product: "Sample Product",
    type: "IN",
    quantity: 20,
    date: "2026-08-04",
  },
  {
    id: 2,
    product: "Sample Product",
    type: "OUT",
    quantity: 5,
    date: "2026-08-04",
  },
];

export default function MovementHistory() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow">

      <div className="mb-6 flex items-center gap-3">

        <Clock3 className="text-blue-600" />

        <h2 className="text-2xl font-bold">
          Stock Movement History
        </h2>

      </div>

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-3 text-left">
              Product
            </th>

            <th className="p-3 text-left">
              Type
            </th>

            <th className="p-3 text-left">
              Quantity
            </th>

            <th className="p-3 text-left">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {movements.map((item) => (

            <tr
              key={item.id}
              className="border-t"
            >

              <td className="p-3">
                {item.product}
              </td>

              <td className="p-3">

                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    item.type === "IN"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.type}
                </span>

              </td>

              <td className="p-3">
                {item.quantity}
              </td>

              <td className="p-3">
                {item.date}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}