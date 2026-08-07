"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type Props = {
  open: boolean;
  productId: number | null;
  currentStock: number;
  onClose: () => void;
};

export default function StockAdjustmentDialog({
  open,
  productId,
  currentStock,
  onClose,
}: Props) {
  const queryClient = useQueryClient();

  const [quantity, setQuantity] =
    useState("");

  const [type, setType] =
    useState("ADD");

  if (!open || !productId) return null;

  async function saveStock() {
    const qty = Number(quantity);

    if (!qty) {
      toast.error("Enter Quantity");
      return;
    }

    const newStock =
      type === "ADD"
        ? currentStock + qty
        : Math.max(
            0,
            currentStock - qty
          );

    const res = await fetch(
      `/api/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          stock: newStock,
        }),
      }
    );

    if (!res.ok) {
      toast.error(
        "Unable to update stock"
      );
      return;
    }

    toast.success("Stock Updated");

    queryClient.invalidateQueries({
      queryKey: ["products"],
    });

    setQuantity("");

    onClose();
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 z-50 h-screen w-[420px] border-l bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">
          Stock Adjustment
        </h2>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block font-medium">
              Current Stock
            </label>

            <Input
              value={currentStock}
              disabled
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Action
            </label>

            <select
              className="w-full rounded-md border p-2"
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
            >
              <option value="ADD">
                Add Stock
              </option>

              <option value="REMOVE">
                Remove Stock
              </option>

            </select>

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Quantity
            </label>

            <Input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  e.target.value
                )
              }
            />

          </div>

          <Button
            className="w-full"
            onClick={saveStock}
          >
            Update Stock
          </Button>

        </div>

      </div>
    </>
  );
}