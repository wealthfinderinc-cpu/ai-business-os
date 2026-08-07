"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  leadSchema,
  LeadFormData,
} from "@/app/validators/lead.schema";

import { LeadService } from "@/services/lead.service";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LeadForm() {

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
    useForm<LeadFormData>({
      resolver:
        zodResolver(
          leadSchema
        ),
    });

  async function onSubmit(
    data: LeadFormData
  ) {

    try {

      setSaving(true);

      await LeadService.create(
        data
      );

      toast.success(
        "Lead added successfully."
      );

      queryClient.invalidateQueries({
        queryKey: [
          "leads",
        ],
      });

      reset();

    } catch (error: any) {

      toast.error(
        error?.message ??
          "Unable to save lead."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-2xl font-semibold">

          Add New Lead

        </h2>

        <p className="mt-1 text-sm text-slate-500">

          Capture a new lead for follow-up.

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
              Lead Source
            </label>

            <Input
              placeholder="Facebook / WhatsApp / Referral"
              {...register("source")}
            />

            {errors.source && (
              <p className="mt-1 text-sm text-red-500">
                {errors.source.message}
              </p>
            )}

          </div>

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Remarks
          </label>

          <Input
            placeholder="Remarks"
            {...register("remarks")}
          />

          {errors.remarks && (
            <p className="mt-1 text-sm text-red-500">
              {errors.remarks.message}
            </p>
          )}

        </div>

        <div className="flex justify-end gap-3 pt-4">

          <Button
            type="button"
            variant="outline"
            disabled={saving}
            onClick={() => reset()}
          >
            Reset
          </Button>

          <Button
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Lead"}
          </Button>

        </div>

      </form>

    </div>
  );
}