import OrderForm from "@/components/orders/OrderForm";

export default function AddOrderPage() {
  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Add Order
      </h1>

      <OrderForm />
    </main>
  );
}