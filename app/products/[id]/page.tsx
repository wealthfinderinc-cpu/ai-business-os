import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProductDetailsDrawer from "@/components/products/ProductDetailsDrawer";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: Props) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <DashboardLayout>

      <ProductDetailsDrawer
        open={true}
        product={product}
        onClose={() => {}}
      />

    </DashboardLayout>
  );
}