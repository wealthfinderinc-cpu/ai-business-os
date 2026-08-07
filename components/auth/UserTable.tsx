"use client";

export default function UserTable() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        System Users
      </h2>

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-3 text-left">
              Name
            </th>

            <th className="p-3 text-left">
              Email
            </th>

            <th className="p-3 text-left">
              Role
            </th>

            <th className="p-3 text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          <tr className="border-t">

            <td className="p-3">
              Admin User
            </td>

            <td className="p-3">
              admin@example.com
            </td>

            <td className="p-3">

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                ADMIN
              </span>

            </td>

            <td className="p-3">

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                Active
              </span>

            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}