"use client";

export default function EmployeeTable() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Employees
      </h2>

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Department</th>
            <th className="p-3 text-left">Designation</th>
            <th className="p-3 text-left">Salary</th>
            <th className="p-3 text-left">Status</th>
          </tr>

        </thead>

        <tbody>

          <tr className="border-t">

            <td className="p-3">EMP001</td>

            <td className="p-3">Demo Employee</td>

            <td className="p-3">Sales</td>

            <td className="p-3">Executive</td>

            <td className="p-3">₹0</td>

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