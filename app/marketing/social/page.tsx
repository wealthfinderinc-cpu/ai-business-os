import DashboardLayout from "@/components/layout/DashboardLayout";
import SocialPostScheduler from "@/components/marketing/SocialPostScheduler";

export default function SocialPage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <h1 className="text-4xl font-bold">
          Social Media Scheduler
        </h1>

        <SocialPostScheduler />

      </div>

    </DashboardLayout>
  );
}