"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ProductExport() {
  async function exportProducts() {
    const res = await fetch("/api/products");

    const products = await res.json();

    const blob = new Blob(
      [JSON.stringify(products, null, 2)],
      {
        type: "application/json",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download = "products.json";

    a.click();

    window.URL.revokeObjectURL(url);
  }

  return (
    <Button
      variant="outline"
      onClick={exportProducts}
    >
      <Download className="mr-2 h-4 w-4" />

      Export Products
    </Button>
  );
}