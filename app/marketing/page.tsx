import DashboardLayout from "@/components/layout/DashboardLayout";
import MarketingDashboard from "@/components/marketing/MarketingDashboard";
import CampaignStats from "@/components/marketing/CampaignStats";
import CampaignForm from "@/components/marketing/CampaignForm";
import CampaignTable from "@/components/marketing/CampaignTable";

export default function MarketingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Marketing Automation
          </h1>

          <p className="mt-2 text-slate-500">
            Manage campaigns, WhatsApp, Email, SMS and Social Media.
          </p>

        </div>

        <MarketingDashboard />

        <CampaignStats />

        <CampaignForm />

        <CampaignTable />

      </div>
    </DashboardLayout>
  );
}