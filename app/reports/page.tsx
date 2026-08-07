import Link from "next/link";

const reports = [
  { title: "Sales", href: "/reports/sales" },
  { title: "Customers", href: "/reports/customers" },
  { title: "Products", href: "/reports/products" },
  { title: "Orders", href: "/reports/orders" },
  { title: "Finance", href: "/reports/finance" },
  { title: "HR", href: "/reports/hr" },
  { title: "Inventory", href: "/reports/inventory" },
];

export default function ReportsPage() {
  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Reports</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="rounded-lg border p-6 hover:bg-slate-50"
          >
            {r.title}
          </Link>
        ))}
      </div>
    </main>
  );
}