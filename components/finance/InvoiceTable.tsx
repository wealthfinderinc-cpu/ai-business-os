"use client";

export default function InvoiceTable() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Latest Invoices
      </h2>

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-3 text-left">
              Invoice
            </th>

            <th className="p-3 text-left">
              Customer
            </th>

            <th className="p-3 text-left">
              Amount
            </th>

            <th className="p-3 text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          <tr className="border-t">

            <td className="p-3">
              INV-0001
            </td>

            <td className="p-3">
              Demo Customer
            </td>

            <td className="p-3">
              ₹0
            </td>

            <td className="p-3">

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                Pending
              </span>

            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}