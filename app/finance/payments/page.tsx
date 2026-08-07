import DashboardLayout from "@/components/layout/DashboardLayout";
import PaymentForm from "@/components/finance/PaymentForm";
import PaymentTable from "@/components/finance/PaymentTable";

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Payment Management
          </h1>

          <p className="mt-2 text-slate-500">
            Receive and manage customer payments.
          </p>

        </div>

        <PaymentForm />

        <PaymentTable />

      </div>
    </DashboardLayout>
  );
}