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

export default function StockTransferDialog({
  open,
  inventory,
  onClose,
}: Props) {

  const queryClient =
    useQueryClient();

  const [saving, setSaving] =
    useState(false);

  const [
    sourceWarehouse,
    setSourceWarehouse,
  ] = useState("");

  const [
    destinationWarehouse,
    setDestinationWarehouse,
  ] = useState("");

  const [quantity, setQuantity] =
    useState(0);

  const [remarks, setRemarks] =
    useState("");

  useEffect(() => {

    if (!inventory)
      return;

    setSourceWarehouse(
      inventory.warehouse ?? ""
    );

    setDestinationWarehouse("");

    setQuantity(0);

    setRemarks("");

  }, [inventory]);

  const remainingStock =
    useMemo(() => {

      if (!inventory)
        return 0;

      return inventory.quantity - quantity;

    }, [
      inventory,
      quantity,
    ]);

  if (!open || !inventory)
    return null;

  async function transferStock() {

    try {

      setSaving(true);

      await InventoryService.transferStock({

        inventoryId:
          inventory.id,

        sourceWarehouse,

        destinationWarehouse,

        quantity,

        remarks,

      });

      toast.success(
        "Stock transferred successfully."
      );

      queryClient.invalidateQueries({
        queryKey: [
          "inventory",
        ],
      });

      onClose();

    } catch {

      toast.error(
        "Unable to transfer stock."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">

              Stock Transfer

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
              Source Warehouse
            </label>

            <Input
              value={sourceWarehouse}
              onChange={(e) =>
                setSourceWarehouse(
                  e.target.value
                )
              }
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Destination Warehouse
            </label>

            <Input
              value={destinationWarehouse}
              onChange={(e) =>
                setDestinationWarehouse(
                  e.target.value
                )
              }
              placeholder="Destination Warehouse"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Transfer Quantity
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
              Remarks
            </label>

            <textarea
              rows={4}
              className="w-full rounded-md border p-3"
              placeholder="Reason for stock transfer..."
              value={remarks}
              onChange={(e) =>
                setRemarks(
                  e.target.value
                )
              }
            />

          </div>

          <div className="rounded-lg border bg-slate-50 p-4">

            <div className="flex justify-between">

              <span>
                Available Stock
              </span>

              <strong>
                {inventory.quantity}
              </strong>

            </div>

            <div className="mt-3 flex justify-between">

              <span>
                Remaining Stock
              </span>

              <strong
                className={
                  remainingStock < 0
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                {remainingStock}
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
              remainingStock < 0 ||
              !destinationWarehouse.trim()
            }
            onClick={transferStock}
          >
            {saving
              ? "Transferring..."
              : "Transfer Stock"}
          </Button>

        </div>

      </div>

    </div>

  );

}