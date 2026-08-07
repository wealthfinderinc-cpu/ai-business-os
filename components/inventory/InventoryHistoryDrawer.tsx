"use client";

import { Button } from "@/components/ui/button";

type History = {
  id: number;
  action: string;
  quantity: number;
  oldStock: number;
  newStock: number;
  warehouse?: string;
  remarks?: string;
  createdAt: string;
  user?: {
    name: string;
  };
};

type Inventory = {
  id: number;
  quantity: number;
  warehouse?: string;

  product: {
    productCode: string;
    name: string;
  };

  history?: History[];
};

type Props = {
  open: boolean;
  inventory: Inventory | null;
  onClose: () => void;
};

export default function InventoryHistoryDrawer({
  open,
  inventory,
  onClose,
}: Props) {

  if (!open || !inventory) {
    return null;
  }

  function badge(action: string) {

    switch (action) {

      case "ADD":

        return "bg-green-100 text-green-700";

      case "REMOVE":

        return "bg-red-100 text-red-700";

      case "TRANSFER":

        return "bg-blue-100 text-blue-700";

      default:

        return "bg-slate-100 text-slate-700";

    }

  }

  return (

    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">

      <div className="h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">

        <div className="sticky top-0 border-b bg-white p-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">

                Inventory History

              </h2>

              <p className="mt-1 text-sm text-slate-500">

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

        </div>

        <div className="p-6">

          <div className="mb-6 rounded-xl border bg-slate-50 p-5">

            <div className="grid gap-4 md:grid-cols-2">

              <div>

                <p className="text-xs uppercase text-slate-500">

                  Product Code

                </p>

                <p className="font-semibold">

                  {inventory.product.productCode}

                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">

                  Current Stock

                </p>

                <p className="font-semibold text-green-700">

                  {inventory.quantity}

                </p>

              </div>

            </div>

          </div>

          <div className="space-y-5">

            {inventory.history?.length ? (

              inventory.history.map((item) => (

                <div
                  key={item.id}
                  className="rounded-xl border p-5"
                >

                  <div className="mb-4 flex items-center justify-between">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(item.action)}`}
                    >
                      {item.action}
                    </span>

                    <span className="text-sm text-slate-500">

                      {new Date(
                        item.createdAt
                      ).toLocaleString()}

                    </span>

                  </div>

                  <div className="grid gap-4 md:grid-cols-2">                    <div>

                      <p className="text-xs uppercase text-slate-500">
                        Old Stock
                      </p>

                      <p className="font-medium">
                        {item.oldStock}
                      </p>

                    </div>

                    <div>

                      <p className="text-xs uppercase text-slate-500">
                        New Stock
                      </p>

                      <p className="font-medium text-green-700">
                        {item.newStock}
                      </p>

                    </div>

                    <div>

                      <p className="text-xs uppercase text-slate-500">
                        Quantity
                      </p>

                      <p>
                        {item.quantity}
                      </p>

                    </div>

                    <div>

                      <p className="text-xs uppercase text-slate-500">
                        Warehouse
                      </p>

                      <p>
                        {item.warehouse || "-"}
                      </p>

                    </div>

                    <div>

                      <p className="text-xs uppercase text-slate-500">
                        Updated By
                      </p>

                      <p>
                        {item.user?.name || "-"}
                      </p>

                    </div>

                    <div>

                      <p className="text-xs uppercase text-slate-500">
                        Remarks
                      </p>

                      <p className="whitespace-pre-wrap">
                        {item.remarks || "-"}
                      </p>

                    </div>

                  </div>

                </div>

              ))

            ) : (

              <div className="rounded-xl border border-dashed p-10 text-center text-slate-500">

                No inventory history found.

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}