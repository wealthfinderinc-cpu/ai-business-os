import DashboardLayout from "@/components/layout/DashboardLayout";
import EmployeeStats from "@/components/hr/EmployeeStats";
import EmployeeForm from "@/components/hr/EmployeeForm";
import EmployeeTable from "@/components/hr/EmployeeTable";

export default function HRPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Employee Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage employees, attendance and payroll.
          </p>

        </div>

        <EmployeeStats />

        <EmployeeForm />

        <EmployeeTable />

      </div>
    </DashboardLayout>
  );
}