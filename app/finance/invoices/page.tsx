import DashboardLayout from "@/components/layout/DashboardLayout";
import InvoiceTable from "@/components/finance/InvoiceTable";

export default function InvoicesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Invoice Management
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage all invoices.
          </p>

        </div>

        <InvoiceTable />

      </div>
    </DashboardLayout>
  );
}