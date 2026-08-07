"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  customerSchema,
  CustomerFormData,
} from "@/app/validators/customer.schema";

import { CustomerService } from "@/services/customer.service";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CustomerForm() {

  const queryClient =
    useQueryClient();

  const [saving, setSaving] =
    useState(false);

  const {

    register,

    handleSubmit,

    reset,

    formState: {
      errors,
    },

  } =
    useForm<CustomerFormData>({
      resolver:
        zodResolver(
          customerSchema
        ),
    });

  async function onSubmit(
    data: CustomerFormData
  ) {

    try {

      setSaving(true);

      await CustomerService.create(
        data
      );

      toast.success(
        "Customer added successfully."
      );

      queryClient.invalidateQueries({
        queryKey: [
          "customers",
        ],
      });

      reset();

    } catch (error: any) {

      toast.error(
        error?.message ??
          "Unable to save customer."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-2xl font-semibold">

          Add Customer

        </h2>

        <p className="mt-1 text-sm text-slate-500">

          Create a new customer record.

        </p>

      </div>

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="space-y-5"
      >

        <div>

          <label className="mb-2 block text-sm font-medium">

            Full Name

          </label>

          <Input
            placeholder="Enter full name"
            {...register(
              "fullName"
            )}
          />

          {errors.fullName && (

            <p className="mt-1 text-sm text-red-500">

              {
                errors.fullName
                  .message
              }

            </p>

          )}

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">

            Mobile Number

          </label>

          <Input
            placeholder="9876543210"
            {...register(
              "mobile"
            )}
          />

          {errors.mobile && (

            <p className="mt-1 text-sm text-red-500">

              {
                errors.mobile
                  .message
              }

            </p>

          )}

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">

            Email Address

          </label>

          <Input
            placeholder="example@email.com"
            {...register(
              "email"
            )}
          />

          {errors.email && (

            <p className="mt-1 text-sm text-red-500">

              {
                errors.email
                  .message
              }

            </p>

          )}

        </div>        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium">
              City
            </label>

            <Input
              placeholder="City"
              {...register("city")}
            />

            {errors.city && (
              <p className="mt-1 text-sm text-red-500">
                {errors.city.message}
              </p>
            )}

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              State
            </label>

            <Input
              placeholder="State"
              {...register("state")}
            />

            {errors.state && (
              <p className="mt-1 text-sm text-red-500">
                {errors.state.message}
              </p>
            )}

          </div>

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Address
          </label>

          <Input
            placeholder="Full Address"
            {...register("address")}
          />

          {errors.address && (
            <p className="mt-1 text-sm text-red-500">
              {errors.address.message}
            </p>
          )}

        </div>

        <div className="flex justify-end gap-3 pt-4">

          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            disabled={saving}
          >
            Reset
          </Button>

          <Button
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Customer"}
          </Button>

        </div>

      </form>

    </div>
  );
}