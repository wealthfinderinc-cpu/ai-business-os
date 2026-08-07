import DashboardLayout from "@/components/layout/DashboardLayout";
import ProductStats from "@/components/products/ProductStats";
import ProductForm from "@/components/products/ProductForm";
import ProductTable from "@/components/products/ProductTable";

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Product Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage products, pricing and inventory.
          </p>

        </div>

        <ProductStats />

        <ProductForm />

        <ProductTable />

      </div>
    </DashboardLayout>
  );
}