"use client";

export default function InventoryStats() {
  return (
    <div className="grid grid-cols-4 gap-5">

      <div className="rounded-xl bg-white p-6 shadow">
        <p className="text-slate-500">
          Total Products
        </p>

        <h2 className="mt-3 text-3xl font-bold text-blue-600">
          0
        </h2>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <p className="text-slate-500">
          In Stock
        </p>

        <h2 className="mt-3 text-3xl font-bold text-green-600">
          0
        </h2>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <p className="text-slate-500">
          Low Stock
        </p>

        <h2 className="mt-3 text-3xl font-bold text-red-600">
          0
        </h2>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <p className="text-slate-500">
          Inventory Value
        </p>

        <h2 className="mt-3 text-3xl font-bold text-purple-600">
          ₹0
        </h2>
      </div>

    </div>
  );
}