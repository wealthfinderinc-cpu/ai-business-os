"use client";

import { useMemo, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { useOrders } from "@/hooks/useOrders";
import { OrderService } from "@/services/order.service";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import EditOrderDialog from "./EditOrderDialog";
import OrderDetailsDrawer from "./OrderDetailsDrawer";

type Order = {
  id: number;
  orderNumber: string;
  customer: {
    fullName: string;
  };
  user: {
    name: string;
  };
  status: string;
  paymentStatus: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  createdAt?: string;
};

export default function OrderTable() {

  const queryClient =
    useQueryClient();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useOrders();

  const orders: Order[] =
    (data as any)?.data ??
    (Array.isArray(data)
      ? data
      : []);

  const [search, setSearch] =
    useState("");

  const [editOpen, setEditOpen] =
    useState(false);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [selectedOrder,
    setSelectedOrder] =
    useState<Order | null>(
      null
    );

  const filteredOrders =
    useMemo(() => {

      const keyword =
        search
          .trim()
          .toLowerCase();

      if (!keyword)
        return orders;

      return orders.filter(
        (order) =>

          order.orderNumber
            .toLowerCase()
            .includes(keyword) ||

          order.customer.fullName
            .toLowerCase()
            .includes(keyword) ||

          order.user.name
            .toLowerCase()
            .includes(keyword)

      );

    }, [
      orders,
      search,
    ]);

  async function handleDelete(
    id: number
  ) {

    if (
      !window.confirm(
        "Delete this order?"
      )
    )
      return;

    try {

      await OrderService.delete(
        id
      );

      toast.success(
        "Order deleted successfully."
      );

      queryClient.invalidateQueries({
        queryKey: [
          "orders",
        ],
      });

    } catch {

      toast.error(
        "Unable to delete order."
      );

    }

  }

  function handleEdit(
    order: Order
  ) {

    setSelectedOrder(
      order
    );

    setEditOpen(true);

  }

  function handleView(
    order: Order
  ) {

    setSelectedOrder(
      order
    );

    setDrawerOpen(true);

  }

  if (isLoading) {

    return (

      <div className="rounded-xl border bg-white p-8">

        <div className="flex justify-center py-10">

          Loading Orders...

        </div>

      </div>

    );

  }

  if (isError) {

    return (

      <div className="rounded-xl border bg-white p-8">

        <div className="space-y-4 text-center">

          <p>

            Unable to load orders.

          </p>

          <Button
            onClick={() =>
              refetch()
            }
          >
            Retry
          </Button>

        </div>

      </div>

    );

  }

  return (

    <>

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-semibold">

              Orders

            </h2>

            <p className="text-sm text-slate-500">

              Total Orders :
              {" "}
              {filteredOrders.length}

            </p>

          </div>

          <Input
            className="w-80"
            placeholder="Search Order..."
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">            <thead className="bg-slate-100">

              <tr>

                <th className="border px-4 py-3 text-left">
                  Order No.
                </th>

                <th className="border px-4 py-3 text-left">
                  Customer
                </th>

                <th className="border px-4 py-3 text-left">
                  Sales Person
                </th>

                <th className="border px-4 py-3 text-center">
                  Order Status
                </th>

                <th className="border px-4 py-3 text-center">
                  Payment
                </th>

                <th className="border px-4 py-3 text-right">
                  Total
                </th>

                <th className="border px-4 py-3 text-center">
                  Date
                </th>

                <th className="border px-4 py-3 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredOrders.length === 0 ? (

                <tr>

                  <td
                    colSpan={8}
                    className="py-12 text-center text-slate-500"
                  >
                    No Orders Found
                  </td>

                </tr>

              ) : (

                filteredOrders.map((order) => (

                  <tr
                    key={order.id}
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() =>
                      handleView(order)
                    }
                  >

                    <td className="border px-4 py-3 font-medium">
                      {order.orderNumber}
                    </td>

                    <td className="border px-4 py-3">
                      {order.customer.fullName}
                    </td>

                    <td className="border px-4 py-3">
                      {order.user.name}
                    </td>

                    <td className="border px-4 py-3 text-center">

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">

                        {order.status}

                      </span>

                    </td>

                    <td className="border px-4 py-3 text-center">

                      {order.paymentStatus === "PAID" ? (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">

                          PAID

                        </span>

                      ) : order.paymentStatus === "PARTIAL" ? (

                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">

                          PARTIAL

                        </span>

                      ) : (

                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">

                          PENDING

                        </span>

                      )}

                    </td>

                    <td className="border px-4 py-3 text-right font-semibold">

                      ₹{order.total.toFixed(2)}

                    </td>

                    <td className="border px-4 py-3 text-center">

                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleDateString()
                        : "-"}

                    </td>

                    <td
                      className="border px-4 py-3"
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >

                      <div className="flex justify-center gap-2">

                        <Button
                          size="sm"
                          onClick={() =>
                            handleEdit(order)
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            handleDelete(order.id)
                          }
                        >
                          Delete
                        </Button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>      <EditOrderDialog
        open={editOpen}
        order={selectedOrder}
        onClose={() => {
          setEditOpen(false);
          setSelectedOrder(null);

          queryClient.invalidateQueries({
            queryKey: ["orders"],
          });
        }}
      />

      <OrderDetailsDrawer
        open={drawerOpen}
        order={selectedOrder}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedOrder(null);
        }}
      />

    </>

  );

}