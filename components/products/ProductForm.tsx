"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  productSchema,
  ProductFormData,
} from "@/app/validators/product.schema";

import { ProductService } from "@/services/product.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductForm() {

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
    useForm<ProductFormData>({
      resolver:
        zodResolver(
          productSchema
        ),
    });

  async function onSubmit(
    data: ProductFormData
  ) {

    try {

      setSaving(true);

      await ProductService.create(
        data
      );

      toast.success(
        "Product added successfully."
      );

      queryClient.invalidateQueries({
        queryKey: [
          "products",
        ],
      });

      reset();

    } catch (error: any) {

      toast.error(
        error?.message ??
          "Unable to save product."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-2xl font-semibold">

          Add Product

        </h2>

        <p className="mt-1 text-sm text-slate-500">

          Create a new product.

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
            Product Code
          </label>

          <Input
            placeholder="PRD001"
            {...register(
              "productCode"
            )}
          />

          {errors.productCode && (
            <p className="mt-1 text-sm text-red-500">
              {errors.productCode.message}
            </p>
          )}

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Product Name
          </label>

          <Input
            placeholder="Product Name"
            {...register("name")}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <Input
              placeholder="Nutrition"
              {...register("category")}
            />

            {errors.category && (
              <p className="mt-1 text-sm text-red-500">
                {errors.category.message}
              </p>
            )}

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Brand
            </label>

            <Input
              placeholder="Modicare"
              {...register("brand")}
            />

            {errors.brand && (
              <p className="mt-1 text-sm text-red-500">
                {errors.brand.message}
              </p>
            )}

          </div>

        </div>        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium">
              MRP
            </label>

            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("mrp", {
                valueAsNumber: true,
              })}
            />

            {errors.mrp && (
              <p className="mt-1 text-sm text-red-500">
                {errors.mrp.message}
              </p>
            )}

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              DP
            </label>

            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("dp", {
                valueAsNumber: true,
              })}
            />

            {errors.dp && (
              <p className="mt-1 text-sm text-red-500">
                {errors.dp.message}
              </p>
            )}

          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-3">

          <div>

            <label className="mb-2 block text-sm font-medium">
              GST %
            </label>

            <Input
              type="number"
              {...register("gst", {
                valueAsNumber: true,
              })}
            />

            {errors.gst && (
              <p className="mt-1 text-sm text-red-500">
                {errors.gst.message}
              </p>
            )}

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Stock
            </label>

            <Input
              type="number"
              {...register("stock", {
                valueAsNumber: true,
              })}
            />

            {errors.stock && (
              <p className="mt-1 text-sm text-red-500">
                {errors.stock.message}
              </p>
            )}

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Minimum Stock
            </label>

            <Input
              type="number"
              {...register("minStock", {
                valueAsNumber: true,
              })}
            />

            {errors.minStock && (
              <p className="mt-1 text-sm text-red-500">
                {errors.minStock.message}
              </p>
            )}

          </div>

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Product Image URL
          </label>

          <Input
            placeholder="https://example.com/image.jpg"
            {...register("image")}
          />

          {errors.image && (
            <p className="mt-1 text-sm text-red-500">
              {errors.image.message}
            </p>
          )}

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            rows={4}
            className="w-full rounded-md border p-3"
            placeholder="Product description..."
            {...register("description")}
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
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
              : "Save Product"}
          </Button>

        </div>

      </form>

    </div>
  );
}