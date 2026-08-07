import DashboardLayout from "@/components/layout/DashboardLayout";
import MovementHistory from "@/components/inventory/MovementHistory";

export default function InventoryHistoryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Inventory History
          </h1>

          <p className="mt-2 text-slate-500">
            Track all stock movements.
          </p>

        </div>

        <MovementHistory />

      </div>
    </DashboardLayout>
  );
}