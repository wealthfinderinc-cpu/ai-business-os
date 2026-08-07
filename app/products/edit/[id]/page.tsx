import EditProductDialog from "@/components/products/EditProductDialog";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Product #{id}
      </h1>

      <EditProductDialog
        open={true}
        product={null}
        onClose={() => {}}
      />
    </main>
  );
}