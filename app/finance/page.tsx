import DashboardLayout from "@/components/layout/DashboardLayout";
import RevenueCards from "@/components/finance/RevenueCards";
import FinanceCharts from "@/components/finance/FinanceCharts";
import InvoiceTable from "@/components/finance/InvoiceTable";

export default function FinancePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Finance Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor revenue, invoices and payments.
          </p>

        </div>

        <RevenueCards />

        <FinanceCharts />

        <InvoiceTable />

      </div>
    </DashboardLayout>
  );
}