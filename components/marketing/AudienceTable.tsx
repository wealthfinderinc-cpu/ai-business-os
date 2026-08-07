"use client";

export default function AudienceTable() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Target Audience
      </h2>

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Mobile</th>
            <th className="p-3 text-left">City</th>
            <th className="p-3 text-left">Status</th>
          </tr>

        </thead>

        <tbody>

          <tr className="border-t">
            <td className="p-3">Demo Customer</td>
            <td className="p-3">9999999999</td>
            <td className="p-3">Delhi</td>
            <td className="p-3">Active</td>
          </tr>

        </tbody>

      </table>

    </div>
  );
}