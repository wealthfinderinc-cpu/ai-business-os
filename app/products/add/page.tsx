import ProductForm from "@/components/products/ProductForm";

export default function AddProductPage() {
  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Add Product
      </h1>

      <ProductForm />
    </main>
  );
}