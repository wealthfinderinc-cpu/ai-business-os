import { notFound } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import InvoicePreview from "@/components/orders/InvoicePreview";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function InvoicePage({
  params,
}: Props) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      customer: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <DashboardLayout>

      <div className="space-y-6">

        <div className="flex justify-end">

          <button
            onClick={() => window.print()}
            className="rounded-lg bg-blue-600 px-5 py-3 text-white"
          >
            Print Invoice
          </button>

        </div>

        <InvoicePreview order={order} />

      </div>

    </DashboardLayout>
  );
}