import DashboardLayout from "@/components/layout/DashboardLayout";
import RoleGuard from "@/components/auth/RoleGuard";

export default function AdminPage() {
  return (
    <DashboardLayout>
      <RoleGuard roles={["ADMIN"]}>
        <div className="rounded-xl bg-white p-10 shadow">

          <h1 className="text-4xl font-bold">
            Admin Panel
          </h1>

          <p className="mt-3 text-slate-500">
            Welcome to AI Business OS Admin Dashboard.
          </p>

        </div>
      </RoleGuard>
    </DashboardLayout>
  );
}