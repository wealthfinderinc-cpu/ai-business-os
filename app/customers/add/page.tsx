import CustomerForm from "@/components/customers/CustomerForm";

export default function AddCustomerPage() {
  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Add Customer
      </h1>

      <CustomerForm />
    </main>
  );
}