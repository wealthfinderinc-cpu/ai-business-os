"use client";

import { useEffect, useMemo, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { useCustomers } from "@/hooks/useCustomers";
import { useProducts } from "@/hooks/useProducts";

import { OrderService } from "@/services/order.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type OrderItem = {
  productId: number;
  quantity: number;
  price: number;
  total: number;
};

type Order = {
  id: number;
  customerId: number;
  userId: number;
  discount: number;
  items: OrderItem[];
};

type Props = {
  open: boolean;
  order: Order | null;
  onClose: () => void;
};

export default function EditOrderDialog({
  open,
  order,
  onClose,
}: Props) {

  const queryClient =
    useQueryClient();

  const { data: customers } =
    useCustomers();

  const { data: products } =
    useProducts();

  const [saving, setSaving] =
    useState(false);

  const [customerId, setCustomerId] =
    useState("");

  const [userId, setUserId] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  const [items, setItems] =
    useState<OrderItem[]>([]);

  useEffect(() => {

    if (!order)
      return;

    setCustomerId(
      String(order.customerId)
    );

    setUserId(
      String(order.userId)
    );

    setDiscount(
      order.discount
    );

    setItems(
      order.items ?? []
    );

  }, [order]);

  const subtotal =
    useMemo(
      () =>
        items.reduce(
          (sum, item) =>
            sum + item.total,
          0
        ),
      [items]
    );

  const tax =
    subtotal * 0.18;

  const grandTotal =
    subtotal +
    tax -
    discount;

  if (!open || !order)
    return null;

  function updateItem(
    index: number,
    field: keyof OrderItem,
    value: any
  ) {

    const copy =
      [...items];

    copy[index] = {
      ...copy[index],
      [field]: value,
    };

    copy[index].total =
      copy[index].price *
      copy[index].quantity;

    setItems(copy);

  }

  function addItem() {

    setItems([
      ...items,
      {
        productId: 0,
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);

  }

  function removeItem(
    index: number
  ) {

    setItems(
      items.filter(
        (_, i) =>
          i !== index
      )
    );

  }

  async function updateOrder() {

    try {

      setSaving(true);

      await OrderService.update(
        order.id,
        {
          customerId:
            Number(customerId),

          userId:
            Number(userId),

          subtotal,

          tax,

          discount,

          total:
            grandTotal,

          items,
        }
      );

      toast.success(
        "Order updated successfully."
      );

      queryClient.invalidateQueries({
        queryKey: [
          "orders",
        ],
      });

      onClose();

    } catch {

      toast.error(
        "Unable to update order."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-4xl rounded-xl bg-white p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">

            Edit Order

          </h2>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>

        </div>        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Customer
            </label>

            <select
              className="w-full rounded-md border p-3"
              value={customerId}
              onChange={(e) =>
                setCustomerId(e.target.value)
              }
            >

              <option value="">
                Select Customer
              </option>

              {(customers as any)?.map(
                (customer: any) => (

                  <option
                    key={customer.id}
                    value={customer.id}
                  >
                    {customer.fullName}
                  </option>

                )
              )}

            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Sales Person
            </label>

            <Input
              value={userId}
              onChange={(e) =>
                setUserId(e.target.value)
              }
            />

          </div>

        </div>

        <div className="mt-8 space-y-4">

          {items.map((item, index) => (

            <div
              key={index}
              className="grid gap-4 rounded-lg border p-4 md:grid-cols-5"
            >

              <select
                className="rounded-md border p-2"
                value={item.productId}
                onChange={(e) => {

                  const product =
                    (products as any)?.find(
                      (p: any) =>
                        p.id === Number(e.target.value)
                    );

                  updateItem(
                    index,
                    "productId",
                    Number(e.target.value)
                  );

                  if (product) {

                    updateItem(
                      index,
                      "price",
                      product.dp
                    );

                  }

                }}
              >

                <option value="0">
                  Select Product
                </option>

                {(products as any)?.map(
                  (product: any) => (

                    <option
                      key={product.id}
                      value={product.id}
                    >
                      {product.name}
                    </option>

                  )
                )}

              </select>

              <Input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateItem(
                    index,
                    "quantity",
                    Number(e.target.value)
                  )
                }
              />

              <Input
                type="number"
                value={item.price}
                onChange={(e) =>
                  updateItem(
                    index,
                    "price",
                    Number(e.target.value)
                  )
                }
              />

              <Input
                disabled
                value={item.total.toFixed(2)}
              />

              <Button
                variant="destructive"
                onClick={() =>
                  removeItem(index)
                }
              >
                Remove
              </Button>

            </div>

          ))}

          <Button
            variant="outline"
            onClick={addItem}
          >
            + Add Product
          </Button>

        </div>

        <div className="mt-8 rounded-xl border p-6">

          <div className="mb-4">

            <label className="mb-2 block text-sm font-medium">
              Discount
            </label>

            <Input
              type="number"
              value={discount}
              onChange={(e) =>
                setDiscount(
                  Number(e.target.value)
                )
              }
            />

          </div>

          <div className="space-y-2 text-right">

            <p>
              Subtotal :
              <strong>
                {" "}
                ₹{subtotal.toFixed(2)}
              </strong>
            </p>

            <p>
              GST :
              <strong>
                {" "}
                ₹{tax.toFixed(2)}
              </strong>
            </p>

            <p className="text-red-600">
              Discount :
              <strong>
                {" "}
                ₹{discount.toFixed(2)}
              </strong>
            </p>

            <h2 className="text-2xl font-bold">
              Grand Total :
              {" "}
              ₹{grandTotal.toFixed(2)}
            </h2>

          </div>

          <div className="mt-8 flex justify-end gap-3">

            <Button
              variant="outline"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </Button>

            <Button
              disabled={saving}
              onClick={updateOrder}
            >
              {saving
                ? "Updating..."
                : "Update Order"}
            </Button>

          </div>

        </div>

      </div>

    </div>

  );

}