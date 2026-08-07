"use client";

import { useEffect, useState } from "react";

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

export default function OrderForm() {

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
    useState("1");

  const [discount, setDiscount] =
    useState(0);

  const [items, setItems] =
    useState<OrderItem>([
      {
        productId: 0,
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);

  const subtotal =
    items.reduce(
      (sum, item) =>
        sum + item.total,
      0
    );

  const tax =
    subtotal * 0.18;

  const grandTotal =
    subtotal +
    tax -
    discount;

  function updateItem(
    index: number,
    field: keyof OrderItem,
    value: any
  ) {

    const copy = [...items];

    copy[index] = {
      ...copy[index],
      [field]: value,
    };

    copy[index].total =
      copy[index].quantity *
      copy[index].price;

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

  async function saveOrder() {

    try {

      setSaving(true);

      await OrderService.create({

        customerId:
          Number(customerId),

        userId:
          Number(userId),

        discount,

        subtotal,

        tax,

        total:
          grandTotal,

        items,

      });

      toast.success(
        "Order Created"
      );

      queryClient.invalidateQueries({
        queryKey: [
          "orders",
        ],
      });

      setCustomerId("");

      setDiscount(0);

      setItems([
        {
          productId: 0,
          quantity: 1,
          price: 0,
          total: 0,
        },
      ]);

    } catch {

      toast.error(
        "Unable to create order."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          Create Order

        </h2>

        <p className="text-slate-500">

          Create customer order.

        </p>

      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-medium">

            Customer

          </label>

          <select
            className="w-full rounded-md border p-3"
            value={customerId}
            onChange={(e)=>
              setCustomerId(
                e.target.value
              )
            }
          >

            <option value="">

              Select Customer

            </option>

            {(customers as any)?.map(
              (customer:any)=>(

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
            onChange={(e)=>
              setUserId(
                e.target.value
              )
            }
          />

        </div>

      </div>

      <div className="mt-8">        {items.map((item, index) => (

          <div
            key={index}
            className="mb-4 grid gap-4 rounded-lg border p-4 md:grid-cols-5"
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
              placeholder="Qty"
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
              placeholder="Price"
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

        <div className="grid gap-4 md:grid-cols-2">

          <div>

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

        </div>

        <div className="mt-8 space-y-3 text-right">

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
            disabled={saving}
          >
            Cancel
          </Button>

          <Button
            disabled={saving}
            onClick={saveOrder}
          >
            {saving
              ? "Saving..."
              : "Create Order"}
          </Button>

        </div>

      </div>

    </div>

  );

}