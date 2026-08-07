"use client";

import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductImport() {
  function importProducts() {
    alert(
      "Import feature will be connected in next sprint."
    );
  }

  return (
    <Button
      variant="outline"
      onClick={importProducts}
    >
      <Upload className="mr-2 h-4 w-4" />

      Import Products
    </Button>
  );
}