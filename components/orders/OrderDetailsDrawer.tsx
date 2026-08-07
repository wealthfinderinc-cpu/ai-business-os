"use client";

import { Button } from "@/components/ui/button";

type OrderItem = {
  id?: number;
  quantity: number;
  price: number;
  total: number;
  product?: {
    name: string;
  };
};

type Order = {
  id: number;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  createdAt?: string;

  customer?: {
    fullName: string;
    mobile?: string;
  };

  user?: {
    name: string;
  };

  items: OrderItem[];
};

type Props = {
  open: boolean;
  order: Order | null;
  onClose: () => void;
};

export default function OrderDetailsDrawer({
  open,
  order,
  onClose,
}: Props) {

  if (!open || !order) {
    return null;
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  }

  return (

    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">

      <div className="h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">

        <div className="sticky top-0 flex items-center justify-between border-b bg-white p-6">

          <div>

            <h2 className="text-2xl font-bold">

              Order Details

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              {order.orderNumber}

            </p>

          </div>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>

        </div>

        <div className="space-y-6 p-6">

          <div className="rounded-xl border p-5">

            <div className="mb-4 flex items-center justify-between">

              <h3 className="font-semibold">

                Order Summary

              </h3>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">

                {order.status}

              </span>

            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <div>

                <p className="text-xs uppercase text-slate-500">

                  Customer

                </p>

                <p className="font-medium">

                  {order.customer?.fullName ?? "-"}

                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">

                  Sales Person

                </p>

                <p>

                  {order.user?.name ?? "-"}

                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">

                  Payment

                </p>

                <p>

                  {order.paymentStatus}

                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">

                  Date

                </p>

                <p>

                  {order.createdAt
                    ? new Date(
                        order.createdAt
                      ).toLocaleString()
                    : "-"}

                </p>

              </div>

            </div>

          </div>

          <div className="rounded-xl border p-5">

            <h3 className="mb-4 font-semibold">

              Order Items

            </h3>

            <div className="overflow-x-auto">

              <table className="min-w-full text-sm">

                <thead>

                  <tr className="bg-slate-100">

                    <th className="border px-3 py-2 text-left">
                      Product
                    </th>

                    <th className="border px-3 py-2 text-center">
                      Qty
                    </th>

                    <th className="border px-3 py-2 text-right">
                      Price
                    </th>

                    <th className="border px-3 py-2 text-right">
                      Total
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {order.items.map(
                    (item, index) => (

                      <tr key={index}>

                        <td className="border px-3 py-2">

                          {item.product?.name ?? "-"}

                        </td>

                        <td className="border px-3 py-2 text-center">

                          {item.quantity}

                        </td>

                        <td className="border px-3 py-2 text-right">

                          ₹{item.price.toFixed(2)}

                        </td>

                        <td className="border px-3 py-2 text-right font-semibold">

                          ₹{item.total.toFixed(2)}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>          <div className="rounded-xl border p-5">

            <h3 className="mb-4 font-semibold">
              Billing Summary
            </h3>

            <div className="space-y-3">

              <div className="flex justify-between">

                <span className="text-slate-600">
                  Subtotal
                </span>

                <strong>
                  ₹{order.subtotal.toFixed(2)}
                </strong>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-600">
                  GST
                </span>

                <strong>
                  ₹{order.tax.toFixed(2)}
                </strong>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-600">
                  Discount
                </span>

                <strong className="text-red-600">
                  ₹{order.discount.toFixed(2)}
                </strong>

              </div>

              <hr />

              <div className="flex justify-between text-lg">

                <span className="font-semibold">
                  Grand Total
                </span>

                <strong className="text-green-700">
                  ₹{order.total.toFixed(2)}
                </strong>

              </div>

            </div>

          </div>

          <div className="rounded-xl border p-5">

            <h3 className="mb-4 font-semibold">
              Quick Actions
            </h3>

            <div className="grid gap-3">

              <Button
                variant="outline"
                onClick={() =>
                  copy(order.orderNumber)
                }
              >
                Copy Order Number
              </Button>

              {order.customer?.mobile && (

                <Button
                  variant="outline"
                  onClick={() =>
                    copy(order.customer.mobile!)
                  }
                >
                  Copy Customer Mobile
                </Button>

              )}

              <Button
                variant="outline"
                onClick={() =>
                  window.print()
                }
              >
                Print Order
              </Button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}