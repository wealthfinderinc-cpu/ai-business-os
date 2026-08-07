import DashboardLayout from "@/components/layout/DashboardLayout";
import OrderForm from "@/components/orders/OrderForm";
import OrderTable from "@/components/orders/OrderTable";

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">
            Order Management
          </h1>

          <p className="mt-2 text-slate-500">
            Create, manage and track customer orders.
          </p>
        </div>

        <OrderForm />

        <OrderTable />
      </div>
    </DashboardLayout>
  );
}