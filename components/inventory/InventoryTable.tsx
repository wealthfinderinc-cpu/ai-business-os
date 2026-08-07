"use client";

import { useEffect, useMemo, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { InventoryService } from "@/services/inventory.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Inventory = {
  id: number;
  quantity: number;
  warehouse?: string;

  product: {
    id: number;
    name: string;
    productCode: string;
  };
};

type Props = {
  open: boolean;
  inventory: Inventory | null;
  onClose: () => void;
};

export default function StockAdjustmentDialog({
  open,
  inventory,
  onClose,
}: Props) {

  const queryClient =
    useQueryClient();

  const [saving, setSaving] =
    useState(false);

  const [adjustmentType,
    setAdjustmentType] =
    useState<"ADD" | "REMOVE">(
      "ADD"
    );

  const [quantity,
    setQuantity] =
    useState(0);

  const [reason,
    setReason] =
    useState("");

  const [warehouse,
    setWarehouse] =
    useState("");

  useEffect(() => {

    if (!inventory)
      return;

    setQuantity(0);

    setReason("");

    setWarehouse(
      inventory.warehouse ?? ""
    );

    setAdjustmentType(
      "ADD"
    );

  }, [inventory]);

  const newStock =
    useMemo(() => {

      if (!inventory)
        return 0;

      return adjustmentType === "ADD"
        ? inventory.quantity + quantity
        : inventory.quantity - quantity;

    }, [
      adjustmentType,
      inventory,
      quantity,
    ]);

  if (!open || !inventory)
    return null;

  async function saveAdjustment() {

    try {

      setSaving(true);

      await InventoryService.adjustStock({

        inventoryId:
          inventory.id,

        type:
          adjustmentType,

        quantity,

        reason,

        warehouse,

      });

      toast.success(
        "Stock adjusted successfully."
      );

      queryClient.invalidateQueries({
        queryKey: [
          "inventory",
        ],
      });

      onClose();

    } catch {

      toast.error(
        "Unable to adjust stock."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">

              Stock Adjustment

            </h2>

            <p className="text-sm text-slate-500">

              {inventory.product.name}

            </p>

          </div>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>

        </div>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block text-sm font-medium">

              Adjustment Type

            </label>

            <select
              className="w-full rounded-md border p-3"
              value={adjustmentType}
              onChange={(e) =>
                setAdjustmentType(
                  e.target.value as
                    "ADD" | "REMOVE"
                )
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

            <label className="mb-2 block text-sm font-medium">

              Quantity

            </label>

            <Input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Number(e.target.value)
                )
              }
            />

          </div>          <div>

            <label className="mb-2 block text-sm font-medium">
              Warehouse
            </label>

            <Input
              value={warehouse}
              onChange={(e) =>
                setWarehouse(
                  e.target.value
                )
              }
              placeholder="Main Warehouse"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Reason
            </label>

            <textarea
              rows={4}
              className="w-full rounded-md border p-3"
              value={reason}
              onChange={(e) =>
                setReason(
                  e.target.value
                )
              }
              placeholder="Reason for stock adjustment..."
            />

          </div>

          <div className="rounded-lg border bg-slate-50 p-4">

            <div className="flex justify-between">

              <span>
                Current Stock
              </span>

              <strong>
                {inventory.quantity}
              </strong>

            </div>

            <div className="mt-3 flex justify-between">

              <span>
                New Stock
              </span>

              <strong
                className={
                  newStock < 0
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                {newStock}
              </strong>

            </div>

          </div>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <Button
            variant="outline"
            disabled={saving}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            disabled={
              saving ||
              quantity <= 0 ||
              newStock < 0
            }
            onClick={saveAdjustment}
          >
            {saving
              ? "Saving..."
              : "Save Adjustment"}
          </Button>

        </div>

      </div>

    </div>

  );

}