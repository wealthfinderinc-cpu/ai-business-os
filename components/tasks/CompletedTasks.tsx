"use client";

export default function CompletedTasks() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Completed Tasks
      </h2>

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-3 text-left">
              Task
            </th>

            <th className="p-3 text-left">
              Assigned
            </th>

            <th className="p-3 text-left">
              Completed On
            </th>

          </tr>

        </thead>

        <tbody>

          <tr className="border-t">

            <td className="p-3">
              Demo Task
            </td>

            <td className="p-3">
              Admin
            </td>

            <td className="p-3">
              Today
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}