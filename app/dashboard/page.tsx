import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardCards from "@/components/dashboard/DashboardCards";
import LeadGrowthChart from "@/components/dashboard/LeadGrowthChart";
import LeadSourceChart from "@/components/dashboard/LeadSourceChart";
import LeadStatusChart from "@/components/dashboard/LeadStatusChart";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            AI Business Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome to AI Business OS CRM
          </p>

        </div>

        <DashboardCards />

        <div className="grid gap-6 xl:grid-cols-2">

          <LeadGrowthChart />

          <LeadSourceChart />

        </div>

        <LeadStatusChart />

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-4 text-xl font-semibold">
              Today's Follow-ups
            </h2>

            <div className="flex h-72 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 text-slate-400">

              Coming Next

            </div>

          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-4 text-xl font-semibold">
              Recent Leads
            </h2>

            <div className="flex h-72 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 text-slate-400">

              Coming Next

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}