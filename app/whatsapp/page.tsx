import DashboardLayout from '@/components/layout/DashboardLayout';
import WhatsAppModule from '@/components/whatsapp/WhatsAppModule';

export default function WhatsAppPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WhatsAppModule />
      </div>
    </DashboardLayout>
  );
}
