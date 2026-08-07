"use client";

export default function WarehouseTable() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Warehouses
      </h2>

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-3 text-left">
              Warehouse
            </th>

            <th className="p-3 text-left">
              Location
            </th>

            <th className="p-3 text-left">
              Products
            </th>

            <th className="p-3 text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          <tr className="border-t">

            <td className="p-3">
              Main Warehouse
            </td>

            <td className="p-3">
              Delhi
            </td>

            <td className="p-3">
              0
            </td>

            <td className="p-3">

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                Active
              </span>

            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}