import DashboardLayout from "@/components/layout/DashboardLayout";
import InventoryStats from "@/components/inventory/InventoryStats";
import InventoryFilters from "@/components/inventory/InventoryFilters";
import InventoryTable from "@/components/inventory/InventoryTable";
import LowStockCard from "@/components/inventory/LowStockCard";

export default function InventoryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Inventory Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage stock movement and inventory.
          </p>

        </div>

        <LowStockCard />

        <InventoryStats />

        <InventoryFilters />

        <InventoryTable />

      </div>
    </DashboardLayout>
  );
}