import EditOrderDialog from "@/components/orders/EditOrderDialog";

export default async function EditOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Order #{id}
      </h1>

      <EditOrderDialog
        open={true}
        order={null}
        onClose={() => {}}
      />
    </main>
  );
}