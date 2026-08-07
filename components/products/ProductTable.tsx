"use client";

import { useMemo, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { useProducts } from "@/hooks/useProducts";
import { ProductService } from "@/services/product.service";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import EditProductDialog from "./EditProductDialog";
import ProductDetailsDrawer from "./ProductDetailsDrawer";

type Product = {
  id: number;
  productCode: string;
  name: string;
  category: string;
  brand?: string | null;
  description?: string | null;
  mrp: number;
  dp: number;
  gst: number;
  stock: number;
  minStock: number;
  active: boolean;
  image?: string | null;
};

export default function ProductTable() {

  const queryClient =
    useQueryClient();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useProducts();

  const products: Product[] =
    (data as any)?.data ??
    (Array.isArray(data)
      ? data
      : []);

  const [search, setSearch] =
    useState("");

  const [editOpen, setEditOpen] =
    useState(false);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [selectedProduct,
    setSelectedProduct] =
    useState<Product | null>(
      null
    );

  const filteredProducts =
    useMemo(() => {

      const keyword =
        search
          .trim()
          .toLowerCase();

      if (!keyword)
        return products;

      return products.filter(
        (product) =>

          product.name
            .toLowerCase()
            .includes(keyword) ||

          product.productCode
            .toLowerCase()
            .includes(keyword) ||

          product.category
            .toLowerCase()
            .includes(keyword) ||

          (product.brand ?? "")
            .toLowerCase()
            .includes(keyword)

      );

    }, [
      products,
      search,
    ]);

  async function handleDelete(
    id: number
  ) {

    if (
      !window.confirm(
        "Delete Product?"
      )
    )
      return;

    try {

      await ProductService.delete(
        id
      );

      toast.success(
        "Product Deleted"
      );

      queryClient.invalidateQueries({
        queryKey: [
          "products",
        ],
      });

    } catch {

      toast.error(
        "Delete Failed"
      );

    }

  }

  function handleEdit(
    product: Product
  ) {

    setSelectedProduct(
      product
    );

    setEditOpen(true);

  }

  function handleView(
    product: Product
  ) {

    setSelectedProduct(
      product
    );

    setDrawerOpen(true);

  }

  if (isLoading) {

    return (
      <div className="rounded-xl border bg-white p-8">

        <div className="flex justify-center py-10">

          Loading Products...

        </div>

      </div>
    );

  }

  if (isError) {

    return (

      <div className="rounded-xl border bg-white p-8">

        <div className="space-y-4 text-center">

          <p>

            Unable to load products.

          </p>

          <Button
            onClick={() =>
              refetch()
            }
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

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-semibold">

              Products

            </h2>

            <p className="text-sm text-slate-500">

              Total :
              {" "}
              {filteredProducts.length}

            </p>

          </div>

          <Input
            className="w-80"
            placeholder="Search Product..."
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">            <thead className="bg-slate-100">

              <tr>

                <th className="border px-4 py-3 text-left">
                  Code
                </th>

                <th className="border px-4 py-3 text-left">
                  Product
                </th>

                <th className="border px-4 py-3 text-left">
                  Category
                </th>

                <th className="border px-4 py-3 text-left">
                  Brand
                </th>

                <th className="border px-4 py-3 text-right">
                  MRP
                </th>

                <th className="border px-4 py-3 text-right">
                  DP
                </th>

                <th className="border px-4 py-3 text-center">
                  Stock
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

              {filteredProducts.length === 0 ? (

                <tr>

                  <td
                    colSpan={9}
                    className="py-12 text-center text-slate-500"
                  >
                    No Products Found
                  </td>

                </tr>

              ) : (

                filteredProducts.map((product) => (

                  <tr
                    key={product.id}
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() =>
                      handleView(product)
                    }
                  >

                    <td className="border px-4 py-3 font-medium">
                      {product.productCode}
                    </td>

                    <td className="border px-4 py-3">

                      <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">

                          {product.image ? (

                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-12 w-12 rounded-lg object-cover"
                            />

                          ) : (

                            <span className="text-xs text-slate-500">
                              No Image
                            </span>

                          )}

                        </div>

                        <div>

                          <div className="font-semibold">
                            {product.name}
                          </div>

                          <div className="text-xs text-slate-500">
                            GST {product.gst}%
                          </div>

                        </div>

                      </div>

                    </td>

                    <td className="border px-4 py-3">
                      {product.category}
                    </td>

                    <td className="border px-4 py-3">
                      {product.brand || "-"}
                    </td>

                    <td className="border px-4 py-3 text-right">
                      ₹{product.mrp.toFixed(2)}
                    </td>

                    <td className="border px-4 py-3 text-right font-semibold text-green-700">
                      ₹{product.dp.toFixed(2)}
                    </td>

                    <td className="border px-4 py-3 text-center">

                      {product.stock <= product.minStock ? (

                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                          {product.stock}
                        </span>

                      ) : (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          {product.stock}
                        </span>

                      )}

                    </td>

                    <td className="border px-4 py-3 text-center">

                      {product.active ? (

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
                            handleEdit(product)
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            handleDelete(
                              product.id
                            )
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

      </div>      <EditProductDialog
        open={editOpen}
        product={selectedProduct}
        onClose={() => {
          setEditOpen(false);
          setSelectedProduct(null);

          queryClient.invalidateQueries({
            queryKey: ["products"],
          });
        }}
      />

      <ProductDetailsDrawer
        open={drawerOpen}
        product={selectedProduct}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedProduct(null);
        }}
      />

    </>

  );

}