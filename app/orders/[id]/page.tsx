import OrderDetailsDrawer from "@/components/orders/OrderDetailsDrawer";

export default async function OrderPage() {
  return (
    <main className="p-6">
      <OrderDetailsDrawer
        open={true}
        order={null}
        onClose={() => {}}
      />
    </main>
  );
}