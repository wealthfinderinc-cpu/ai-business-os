import DashboardLayout from "@/components/layout/DashboardLayout";
import AttendanceForm from "@/components/hr/AttendanceForm";
import AttendanceTable from "@/components/hr/AttendanceTable";

export default function AttendancePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Attendance Management
          </h1>

          <p className="mt-2 text-slate-500">
            Mark and manage employee attendance.
          </p>

        </div>

        <AttendanceForm />

        <AttendanceTable />

      </div>
    </DashboardLayout>
  );
}