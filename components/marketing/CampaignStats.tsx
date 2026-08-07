"use client";

export default function CampaignStats() {
  const stats = [
    {
      title: "WhatsApp",
      value: 0,
      color: "text-green-600",
    },
    {
      title: "Email",
      value: 0,
      color: "text-blue-600",
    },
    {
      title: "SMS",
      value: 0,
      color: "text-orange-600",
    },
    {
      title: "Social",
      value: 0,
      color: "text-pink-600",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-5">

      {stats.map((item) => (

        <div
          key={item.title}
          className="rounded-xl border bg-white p-6 shadow-sm"
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