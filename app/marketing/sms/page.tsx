import DashboardLayout from "@/components/layout/DashboardLayout";
import SMSCampaign from "@/components/marketing/SMSCampaign";

export default function SMSPage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <h1 className="text-4xl font-bold">
          SMS Marketing
        </h1>

        <SMSCampaign />

      </div>

    </DashboardLayout>
  );
}