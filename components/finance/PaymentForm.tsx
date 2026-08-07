"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PaymentForm() {
  const [form, setForm] = useState({
    invoiceNo: "",
    customer: "",
    amount: "",
    method: "Cash",
    remarks: "",
  });

  function savePayment() {
    toast.success("Payment Saved");

    setForm({
      invoiceNo: "",
      customer: "",
      amount: "",
      method: "Cash",
      remarks: "",
    });
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Receive Payment
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <Input
          placeholder="Invoice Number"
          value={form.invoiceNo}
          onChange={(e) =>
            setForm({
              ...form,
              invoiceNo: e.target.value,
            })
          }
        />

        <Input
          placeholder="Customer"
          value={form.customer}
          onChange={(e) =>
            setForm({
              ...form,
              customer: e.target.value,
            })
          }
        />

        <Input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) =>
            setForm({
              ...form,
              amount: e.target.value,
            })
          }
        />

        <select
          className="rounded-md border p-2"
          value={form.method}
          onChange={(e) =>
            setForm({
              ...form,
              method: e.target.value,
            })
          }
        >
          <option>Cash</option>
          <option>UPI</option>
          <option>Bank Transfer</option>
          <option>Cheque</option>
        </select>

      </div>

      <div className="mt-4">

        <Input
          placeholder="Remarks"
          value={form.remarks}
          onChange={(e) =>
            setForm({
              ...form,
              remarks: e.target.value,
            })
          }
        />

      </div>

      <Button
        className="mt-6 w-full"
        onClick={savePayment}
      >
        Save Payment
      </Button>

    </div>
  );
}