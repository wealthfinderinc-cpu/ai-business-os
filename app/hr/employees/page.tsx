import EmployeeSearch from "@/components/hr/EmployeeSearch";
import EmployeeFilters from "@/components/hr/EmployeeFilters";
import EmployeeDetailsDrawer from "@/components/hr/EmployeeDetailsDrawer";

export default function EmployeesPage() {
  return (
    <main className="space-y-6 p-6">

      <h1 className="text-3xl font-bold">
        Employees
      </h1>

      <EmployeeSearch />

      <EmployeeFilters />

      <EmployeeDetailsDrawer
        open={false}
        employee={null}
        onClose={() => {}}
      />

    </main>
  );
}