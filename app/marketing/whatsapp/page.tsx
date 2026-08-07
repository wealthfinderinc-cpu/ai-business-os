import DashboardLayout from "@/components/layout/DashboardLayout";
import WhatsAppBroadcast from "@/components/marketing/WhatsAppBroadcast";

export default function WhatsAppPage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <h1 className="text-4xl font-bold">
          WhatsApp Marketing
        </h1>

        <WhatsAppBroadcast />

      </div>

    </DashboardLayout>
  );
}