import ProductForm from "@/components/products/ProductForm";
import ProductTable from "@/components/products/ProductTable";

export default function ProductsPage() {
  return (
    <main className="p-6">

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <ProductForm />

        <div className="lg:col-span-2">
          <ProductTable />
        </div>

      </div>

    </main>
  );
}