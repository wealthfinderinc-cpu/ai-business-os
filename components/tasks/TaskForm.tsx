"use client";

export default function TaskBoard() {
  const columns = [
    {
      title: "To Do",
      color: "bg-slate-100",
    },
    {
      title: "In Progress",
      color: "bg-blue-100",
    },
    {
      title: "Review",
      color: "bg-yellow-100",
    },
    {
      title: "Completed",
      color: "bg-green-100",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">

      {columns.map((column) => (

        <div
          key={column.title}
          className={`rounded-xl p-4 ${column.color}`}
        >

          <h2 className="mb-4 text-lg font-bold">
            {column.title}
          </h2>

          <div className="rounded-lg bg-white p-4 shadow">

            <h3 className="font-semibold">
              Demo Task
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Sample description...
            </p>

          </div>

        </div>

      ))}

    </div>
  );
}