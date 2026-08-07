import CustomerForm from "@/components/customers/CustomerForm";
import CustomerTable from "@/components/customers/CustomerTable";

export default function CustomersPage() {
  return (
    <main className="p-6">

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <CustomerForm />

        <div className="lg:col-span-2">
          <CustomerTable />
        </div>

      </div>

    </main>
  );
}