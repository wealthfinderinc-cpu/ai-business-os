"use client";

import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useCustomers } from "@/hooks/useCustomers";
import { CustomerService } from "@/services/customer.service";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import EditCustomerDialog from "./EditCustomerDialog";
import CustomerDetailsDrawer from "./CustomerDetailsDrawer";

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

export default function CustomerTable() {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useCustomers();

  const customers: Customer[] =
    (data as any)?.data ??
    (Array.isArray(data) ? data : []);

  const [search, setSearch] =
    useState("");

  const [editOpen, setEditOpen] =
    useState(false);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const filteredCustomers = useMemo(() => {
    const keyword = search
      .trim()
      .toLowerCase();

    if (!keyword) return customers;

    return customers.filter((customer) => {
      return (
        customer.fullName
          .toLowerCase()
          .includes(keyword) ||

        customer.mobile
          .toLowerCase()
          .includes(keyword) ||

        (customer.email ?? "")
          .toLowerCase()
          .includes(keyword) ||

        (customer.city ?? "")
          .toLowerCase()
          .includes(keyword) ||

        (customer.state ?? "")
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [customers, search]);

  async function handleDelete(id: number) {
    const ok = window.confirm(
      "Delete this customer?"
    );

    if (!ok) return;

    try {
      await CustomerService.delete(id);

      toast.success(
        "Customer deleted successfully."
      );

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to delete customer."
      );
    }
  }

  function handleEdit(customer: Customer) {
    setSelectedCustomer(customer);

    setEditOpen(true);
  }

  function handleView(customer: Customer) {
    setSelectedCustomer(customer);

    setDrawerOpen(true);
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white p-8">
        <div className="flex items-center justify-center py-10">
          Loading customers...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border bg-white p-8">
        <div className="space-y-4 text-center">

          <p>
            Unable to load customers.
          </p>

          <Button
            onClick={() => refetch()}
          >
            Retry
          </Button>

        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center justify-between gap-4">

          <div>

            <h2 className="text-2xl font-semibold">
              Customers
            </h2>

            <p className="text-sm text-slate-500">
              Total Records :
              {" "}
              {filteredCustomers.length}
            </p>

          </div>

          <Input
            placeholder="Search customer..."
            className="w-80"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">          <table className="min-w-full text-sm">

            <thead className="bg-slate-100">

              <tr>

                <th className="border px-4 py-3 text-left">
                  Customer ID
                </th>

                <th className="border px-4 py-3 text-left">
                  Name
                </th>

                <th className="border px-4 py-3 text-left">
                  Mobile
                </th>

                <th className="border px-4 py-3 text-left">
                  Email
                </th>

                <th className="border px-4 py-3 text-left">
                  City
                </th>

                <th className="border px-4 py-3 text-left">
                  State
                </th>

                <th className="border px-4 py-3 text-center">
                  Status
                </th>

                <th className="border px-4 py-3 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredCustomers.length === 0 ? (

                <tr>

                  <td
                    colSpan={8}
                    className="py-12 text-center text-slate-500"
                  >
                    No customers found.
                  </td>

                </tr>

              ) : (

                filteredCustomers.map((customer) => (

                  <tr
                    key={customer.id}
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() =>
                      handleView(customer)
                    }
                  >

                    <td className="border px-4 py-3">
                      {customer.customerId}
                    </td>

                    <td className="border px-4 py-3 font-medium">
                      {customer.fullName}
                    </td>

                    <td className="border px-4 py-3">
                      {customer.mobile}
                    </td>

                    <td className="border px-4 py-3">
                      {customer.email || "-"}
                    </td>

                    <td className="border px-4 py-3">
                      {customer.city || "-"}
                    </td>

                    <td className="border px-4 py-3">
                      {customer.state || "-"}
                    </td>

                    <td className="border px-4 py-3 text-center">

                      {customer.active ? (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>

                      ) : (

                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                          Inactive
                        </span>

                      )}

                    </td>

                    <td
                      className="border px-4 py-3"
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >

                      <div className="flex justify-center gap-2">

                        <Button
                          size="sm"
                          onClick={() =>
                            handleEdit(customer)
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            handleDelete(customer.id)
                          }
                        >
                          Delete
                        </Button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>      <EditCustomerDialog
        open={editOpen}
        customer={selectedCustomer}
        onClose={() => {
          setEditOpen(false);
          setSelectedCustomer(null);

          queryClient.invalidateQueries({
            queryKey: ["customers"],
          });
        }}
      />

      <CustomerDetailsDrawer
        open={drawerOpen}
        customer={selectedCustomer}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedCustomer(null);
        }}
      />

    </>
  );
}