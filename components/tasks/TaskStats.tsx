"use client";

export default function TaskStats() {
  const stats = [
    {
      title: "Total Tasks",
      value: 0,
      color: "text-blue-600",
    },
    {
      title: "Pending",
      value: 0,
      color: "text-red-600",
    },
    {
      title: "Completed",
      value: 0,
      color: "text-green-600",
    },
    {
      title: "Overdue",
      value: 0,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-5">

      {stats.map((item) => (

        <div
          key={item.title}
          className="rounded-xl bg-white p-6 shadow"
        >

          <p className="text-slate-500">
            {item.title}
          </p>

          <h2
            className={`mt-3 text-3xl font-bold ${item.color}`}
          >
            {item.value}
          </h2>

        </div>

      ))}

    </div>
  );
}