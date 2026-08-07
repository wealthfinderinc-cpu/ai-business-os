import DashboardLayout from "@/components/layout/DashboardLayout";
import ExpenseForm from "@/components/finance/ExpenseForm";
import ExpenseTable from "@/components/finance/ExpenseTable";

export default function ExpensesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Expense Management
          </h1>

          <p className="mt-2 text-slate-500">
            Track all business expenses.
          </p>

        </div>

        <ExpenseForm />

        <ExpenseTable />

      </div>
    </DashboardLayout>
  );
}