import EditCustomerDialog from "@/components/customers/EditCustomerDialog";

export default async function EditCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="p-6">
      <EditCustomerDialog
        open={true}
        customer={null}
        onClose={() => {}}
      />
    </main>
  );
}