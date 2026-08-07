"use client";

import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { ProductService } from "@/services/product.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
};

type Props = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
};

export default function EditProductDialog({
  open,
  product,
  onClose,
}: Props) {

  const queryClient =
    useQueryClient();

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({

      productCode: "",

      name: "",

      category: "",

      brand: "",

      description: "",

      mrp: 0,

      dp: 0,

      gst: 18,

      stock: 0,

      minStock: 10,

      image: "",

    });

  useEffect(() => {

    if (!product)
      return;

    setForm({

      productCode:
        product.productCode,

      name:
        product.name,

      category:
        product.category,

      brand:
        product.brand ?? "",

      description:
        product.description ?? "",

      mrp:
        product.mrp,

      dp:
        product.dp,

      gst:
        product.gst,

      stock:
        product.stock,

      minStock:
        product.minStock,

      image:
        product.image ?? "",

    });

  }, [product]);

  if (!open || !product)
    return null;

  async function save() {

    try {

      setSaving(true);

      await ProductService.update(
        product.id,
        form
      );

      toast.success(
        "Product updated successfully."
      );

      queryClient.invalidateQueries({
        queryKey: [
          "products",
        ],
      });

      onClose();

    } catch (error: any) {

      toast.error(
        error?.message ??
          "Unable to update product."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-semibold">

            Edit Product

          </h2>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>

        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <Input
            placeholder="Product Code"
            value={form.productCode}
            onChange={(e) =>
              setForm({
                ...form,
                productCode: e.target.value,
              })
            }
          />

          <Input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <Input
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          />

          <Input
            placeholder="Brand"
            value={form.brand}
            onChange={(e) =>
              setForm({
                ...form,
                brand: e.target.value,
              })
            }
          />          <Input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <Input
            type="number"
            placeholder="MRP"
            value={form.mrp}
            onChange={(e) =>
              setForm({
                ...form,
                mrp: Number(e.target.value),
              })
            }
          />

          <Input
            type="number"
            placeholder="DP"
            value={form.dp}
            onChange={(e) =>
              setForm({
                ...form,
                dp: Number(e.target.value),
              })
            }
          />

          <Input
            type="number"
            placeholder="GST %"
            value={form.gst}
            onChange={(e) =>
              setForm({
                ...form,
                gst: Number(e.target.value),
              })
            }
          />

          <Input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) =>
              setForm({
                ...form,
                stock: Number(e.target.value),
              })
            }
          />

          <Input
            type="number"
            placeholder="Minimum Stock"
            value={form.minStock}
            onChange={(e) =>
              setForm({
                ...form,
                minStock: Number(e.target.value),
              })
            }
          />

          <Input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.value,
              })
            }
          />

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
            disabled={saving}
            onClick={save}
          >
            {saving
              ? "Saving..."
              : "Update Product"}
          </Button>

        </div>

      </div>

    </div>

  );

}