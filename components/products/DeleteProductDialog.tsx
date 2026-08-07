"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  open: boolean;
  productId: number | null;
  productName: string;
  onClose: () => void;
};

export default function DeleteProductDialog({
  open,
  productId,
  productName,
  onClose,
}: Props) {
  const queryClient = useQueryClient();

  if (!open || !productId) return null;

  async function deleteProduct() {
    const res = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast.error("Unable to delete product");
      return;
    }

    toast.success("Product Deleted");

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

      <div className="fixed left-1/2 top-1/2 z-50 w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl">

        <h2 className="text-2xl font-bold">
          Delete Product
        </h2>

        <p className="mt-4 text-slate-600">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            {productName}
          </span>
          ?
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={deleteProduct}
          >
            Delete
          </Button>

        </div>

      </div>
    </>
  );
}