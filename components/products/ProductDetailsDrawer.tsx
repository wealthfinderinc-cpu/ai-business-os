"use client";

import { Button } from "@/components/ui/button";

type Product = {
  id: number;
  productCode: string;
  name: string;
  category: string;
  brand?: string | null;
  description?: string | null;
  mrp: number;
  dp: number;
  gst: number;
  stock: number;
  minStock: number;
  active: boolean;
  image?: string | null;
  createdAt?: string;
};

type Props = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
};

export default function ProductDetailsDrawer({
  open,
  product,
  onClose,
}: Props) {

  if (!open || !product) {
    return null;
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  }

  return (

    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">

      <div className="h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl">

        <div className="sticky top-0 flex items-center justify-between border-b bg-white p-6">

          <div>

            <h2 className="text-2xl font-semibold">

              Product Details

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              {product.productCode}

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

          <div className="flex justify-center">

            {product.image ? (

              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-40 rounded-xl border object-cover"
              />

            ) : (

              <div className="flex h-40 w-40 items-center justify-center rounded-xl border bg-slate-100 text-slate-500">

                No Image

              </div>

            )}

          </div>

          <div className="rounded-xl border p-4">

            <div className="mb-4 flex items-center justify-between">

              <h3 className="font-semibold">

                Product Information

              </h3>

              {product.active ? (

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">

                  Active

                </span>

              ) : (

                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">

                  Inactive

                </span>

              )}

            </div>

            <div className="space-y-4">

              <div>

                <p className="text-xs uppercase text-slate-500">
                  Product Name
                </p>

                <p className="font-medium">
                  {product.name}
                </p>

              </div>

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    Product Code
                  </p>

                  <p>
                    {product.productCode}
                  </p>

                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    copy(product.productCode)
                  }
                >
                  Copy
                </Button>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">
                  Category
                </p>

                <p>
                  {product.category}
                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">
                  Brand
                </p>

                <p>
                  {product.brand || "-"}
                </p>

              </div>              <div>

                <p className="text-xs uppercase text-slate-500">
                  Description
                </p>

                <p className="whitespace-pre-wrap">
                  {product.description || "-"}
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-xl border p-4">

            <h3 className="mb-4 font-semibold">
              Pricing & Inventory
            </h3>

            <div className="space-y-4">

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    MRP
                  </p>

                  <p className="font-semibold">
                    ₹{product.mrp.toFixed(2)}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    DP
                  </p>

                  <p className="font-semibold text-green-700">
                    ₹{product.dp.toFixed(2)}
                  </p>

                </div>

              </div>

              <div className="grid grid-cols-3 gap-4">

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    GST
                  </p>

                  <p>{product.gst}%</p>

                </div>

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    Stock
                  </p>

                  <p
                    className={
                      product.stock <= product.minStock
                        ? "font-semibold text-red-600"
                        : "font-semibold text-green-600"
                    }
                  >
                    {product.stock}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    Min Stock
                  </p>

                  <p>{product.minStock}</p>

                </div>

              </div>

            </div>

          </div>

          <div className="rounded-xl border p-4">

            <h3 className="mb-4 font-semibold">
              System Information
            </h3>

            <div className="space-y-4">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    Product Code
                  </p>

                  <p className="font-medium">
                    {product.productCode}
                  </p>

                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    copy(product.productCode)
                  }
                >
                  Copy
                </Button>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">
                  Created
                </p>

                <p>
                  {product.createdAt
                    ? new Date(
                        product.createdAt
                      ).toLocaleString()
                    : "-"}
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-xl border p-4">

            <h3 className="mb-4 font-semibold">
              Quick Actions
            </h3>

            <div className="grid gap-3">

              <Button
                variant="outline"
                onClick={() =>
                  copy(product.productCode)
                }
              >
                Copy Product Code
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  copy(product.name)
                }
              >
                Copy Product Name
              </Button>

              {product.image && (
                <Button
                  variant="outline"
                  onClick={() =>
                    copy(product.image!)
                  }
                >
                  Copy Image URL
                </Button>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}