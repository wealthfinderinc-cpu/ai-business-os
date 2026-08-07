import DashboardLayout from "@/components/layout/DashboardLayout";
import EmailCampaign from "@/components/marketing/EmailCampaign";

export default function EmailPage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <h1 className="text-4xl font-bold">
          Email Marketing
        </h1>

        <EmailCampaign />

      </div>

    </DashboardLayout>
  );
}