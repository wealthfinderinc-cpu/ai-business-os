"use client";

import { Button } from "@/components/ui/button";

export default function PrintInvoiceButton() {
  return (
    <Button
      onClick={() => window.print()}
    >
      Print Invoice
    </Button>
  );
}