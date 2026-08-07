import CustomerDetailsDrawer from "@/components/customers/CustomerDetailsDrawer";

export default async function CustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Customer #{id}
      </h1>

      <CustomerDetailsDrawer
        open={true}
        customer={{
          id,
        }}
        onClose={() => {}}
      />
    </main>
  );
}