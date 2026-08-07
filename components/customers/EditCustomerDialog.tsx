"use client";

import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { CustomerService } from "@/services/customer.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Customer = {
  id: number;
  customerId: string;
  fullName: string;
  mobile: string;
  email?: string | null;
  city?: string | null;
  state?: string | null;
  address?: string | null;
  active: boolean;
};

type Props = {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
};

export default function EditCustomerDialog({
  open,
  customer,
  onClose,
}: Props) {

  const queryClient =
    useQueryClient();

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({

      fullName: "",

      mobile: "",

      email: "",

      city: "",

      state: "",

      address: "",

    });

  useEffect(() => {

    if (!customer)
      return;

    setForm({

      fullName:
        customer.fullName,

      mobile:
        customer.mobile,

      email:
        customer.email ??
        "",

      city:
        customer.city ??
        "",

      state:
        customer.state ??
        "",

      address:
        customer.address ??
        "",

    });

  }, [customer]);

  if (!open || !customer)
    return null;

  async function save() {

    try {

      setSaving(true);

      await CustomerService.update(
        customer.id,
        form
      );

      toast.success(
        "Customer updated successfully."
      );

      queryClient.invalidateQueries({
        queryKey: [
          "customers",
        ],
      });

      onClose();

    } catch (error: any) {

      toast.error(
        error?.message ??
          "Unable to update customer."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-semibold">

            Edit Customer

          </h2>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>

        </div>

        <div className="space-y-4">

          <Input
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e)=>

              setForm({

                ...form,

                fullName:
                  e.target.value,

              })

            }
          />

          <Input
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e)=>

              setForm({

                ...form,

                mobile:
                  e.target.value,

              })

            }
          />

          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e)=>

              setForm({

                ...form,

                email:
                  e.target.value,

              })

            }
          />          <Input
            placeholder="City"
            value={form.city}
            onChange={(e) =>
              setForm({
                ...form,
                city: e.target.value,
              })
            }
          />

          <Input
            placeholder="State"
            value={form.state}
            onChange={(e) =>
              setForm({
                ...form,
                state: e.target.value,
              })
            }
          />

          <Input
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value,
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
              : "Update Customer"}
          </Button>

        </div>

      </div>

    </div>

  );

}