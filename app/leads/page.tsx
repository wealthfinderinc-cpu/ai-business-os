import DashboardLayout from "@/components/layout/DashboardLayout";
import LeadForm from "@/components/leads/LeadForm";
import LeadTable from "@/components/leads/LeadTable";

export default function LeadsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">
            Lead Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage all your leads from one place.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <LeadForm />
          <LeadTable />
        </div>
      </div>
    </DashboardLayout>
  );
}