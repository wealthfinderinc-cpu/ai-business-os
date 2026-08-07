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

export default function StockInDialog({
  open,
  productId,
  currentStock,
  onClose,
}: Props) {
  const queryClient = useQueryClient();

  const [qty, setQty] = useState("");

  if (!open || !productId) return null;

  async function save() {
    const res = await fetch(
      `/api/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          stock:
            currentStock + Number(qty),
        }),
      }
    );

    if (!res.ok) {
      toast.error("Unable to update stock");
      return;
    }

    toast.success("Stock Added");

    queryClient.invalidateQueries({
      queryKey: ["products"],
    });

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
          Stock In
        </h2>

        <Input
          value={currentStock}
          disabled
        />

        <div className="mt-5">

          <Input
            type="number"
            placeholder="Quantity"
            value={qty}
            onChange={(e) =>
              setQty(e.target.value)
            }
          />

        </div>

        <Button
          className="mt-6 w-full"
          onClick={save}
        >
          Add Stock
        </Button>

      </div>
    </>
  );
}