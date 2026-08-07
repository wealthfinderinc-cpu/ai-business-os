"use client";

import { Button } from "@/components/ui/button";

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
  createdAt?: string;
};

type Props = {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
};

export default function CustomerDetailsDrawer({
  open,
  customer,
  onClose,
}: Props) {

  if (!open || !customer) {
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
              Customer Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {customer.customerId}
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

          <div className="rounded-xl border p-4">

            <div className="mb-4 flex items-center justify-between">

              <h3 className="font-semibold">
                Basic Information
              </h3>

              {customer.active ? (
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
                  Full Name
                </p>

                <p className="font-medium">
                  {customer.fullName}
                </p>

              </div>

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    Mobile
                  </p>

                  <p>{customer.mobile}</p>

                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    copy(customer.mobile)
                  }
                >
                  Copy
                </Button>

              </div>

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    Email
                  </p>

                  <p>
                    {customer.email || "-"}
                  </p>

                </div>

                {customer.email && (

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copy(customer.email!)
                    }
                  >
                    Copy
                  </Button>

                )}

              </div>              <div className="grid gap-4 md:grid-cols-2">

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    City
                  </p>

                  <p>
                    {customer.city || "-"}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    State
                  </p>

                  <p>
                    {customer.state || "-"}
                  </p>

                </div>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">
                  Address
                </p>

                <p>
                  {customer.address || "-"}
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-xl border p-4">

            <h3 className="mb-4 font-semibold">
              Account Information
            </h3>

            <div className="space-y-4">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    Customer ID
                  </p>

                  <p className="font-medium">
                    {customer.customerId}
                  </p>

                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    copy(customer.customerId)
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
                  {customer.createdAt
                    ? new Date(
                        customer.createdAt
                      ).toLocaleString()
                    : "-"}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}