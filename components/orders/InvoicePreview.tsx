"use client";

type Order = {
  orderNumber: string;
  amount: number;
  paymentStatus: string;
  createdAt?: string;

  customer: {
    customerId: string;
    fullName: string;
    mobile: string;
    email?: string;
    address?: string;
  };
};

type Props = {
  order: Order;
};

export default function InvoicePreview({
  order,
}: Props) {
  return (
    <div className="mx-auto max-w-4xl rounded-xl border bg-white p-10 shadow">

      <div className="flex justify-between border-b pb-6">

        <div>

          <h1 className="text-3xl font-bold">
            AI BUSINESS OS
          </h1>

          <p className="text-slate-500">
            Tax Invoice
          </p>

        </div>

        <div className="text-right">

          <h2 className="text-xl font-semibold">
            Invoice
          </h2>

          <p>No : {order.orderNumber}</p>

          <p>
            Date :
            {" "}
            {order.createdAt
              ? new Date(
                  order.createdAt
                ).toLocaleDateString()
              : "-"}
          </p>

        </div>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-8">

        <div>

          <h3 className="mb-3 text-lg font-semibold">
            Bill To
          </h3>

          <p>{order.customer.fullName}</p>

          <p>{order.customer.mobile}</p>

          <p>{order.customer.email}</p>

          <p>{order.customer.address}</p>

        </div>

        <div className="text-right">

          <h3 className="mb-3 text-lg font-semibold">
            Payment
          </h3>

          <p>{order.paymentStatus}</p>

        </div>

      </div>

      <table className="mt-10 w-full border">

        <thead className="bg-slate-100">

          <tr>

            <th className="border p-3">
              Description
            </th>

            <th className="border p-3">
              Qty
            </th>

            <th className="border p-3">
              Rate
            </th>

            <th className="border p-3">
              Total
            </th>

          </tr>

        </thead>

        <tbody>

          <tr>

            <td className="border p-3">
              Order
            </td>

            <td className="border p-3 text-center">
              1
            </td>

            <td className="border p-3 text-center">
              ₹ {order.amount}
            </td>

            <td className="border p-3 text-center">
              ₹ {order.amount}
            </td>

          </tr>

        </tbody>

      </table>

      <div className="mt-8 flex justify-end">

        <div className="w-72">

          <div className="flex justify-between border-b py-2">

            <span>Subtotal</span>

            <span>₹ {order.amount}</span>

          </div>

          <div className="flex justify-between border-b py-2">

            <span>GST</span>

            <span>₹ 0</span>

          </div>

          <div className="flex justify-between py-4 text-xl font-bold">

            <span>Grand Total</span>

            <span>₹ {order.amount}</span>

          </div>

        </div>

      </div>

      <div className="mt-16 flex justify-between">

        <div>

          <p className="text-slate-500">
            Thank you for your business.
          </p>

        </div>

        <div className="text-center">

          <div className="h-20"></div>

          <p className="border-t pt-2">
            Authorized Signature
          </p>

        </div>

      </div>

    </div>
  );
}