import DashboardLayout from "@/components/layout/DashboardLayout";
import CampaignForm from "@/components/marketing/CampaignForm";
import CampaignTable from "@/components/marketing/CampaignTable";
import CampaignAnalytics from "@/components/marketing/CampaignAnalytics";

export default function CampaignsPage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Campaign Management
          </h1>

          <p className="mt-2 text-slate-500">
            Create and manage all marketing campaigns.
          </p>

        </div>

        <CampaignForm />

        <CampaignTable />

        <CampaignAnalytics />

      </div>

    </DashboardLayout>
  );
}