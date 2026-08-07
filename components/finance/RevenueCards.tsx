"use client";

export default function RevenueCards() {
  const cards = [
    {
      title: "Today's Revenue",
      value: "₹0",
      color: "text-blue-600",
    },
    {
      title: "Monthly Revenue",
      value: "₹0",
      color: "text-green-600",
    },
    {
      title: "Pending Payments",
      value: "₹0",
      color: "text-red-600",
    },
    {
      title: "Invoices",
      value: "0",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-5">

      {cards.map((card) => (

        <div
          key={card.title}
          className="rounded-xl bg-white p-6 shadow"
        >

          <p className="text-slate-500">
            {card.title}
          </p>

          <h2
            className={`mt-3 text-3xl font-bold ${card.color}`}
          >
            {card.value}
          </h2>

        </div>

      ))}

    </div>
  );
}