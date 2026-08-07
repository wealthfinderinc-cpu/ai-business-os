"use client";

import { Button } from "@/components/ui/button";

type Employee = {
  id: number;
  employeeCode: string;
  fullName: string;
  email?: string | null;
  mobile?: string | null;
  designation?: string | null;
  salary?: number | null;
  active: boolean;
  createdAt?: string;

  department?: {
    id: number;
    name: string;
  };
};

type Props = {
  open: boolean;
  employee: Employee | null;
  onClose: () => void;
};

export default function EmployeeDetailsDrawer({
  open,
  employee,
  onClose,
}: Props) {

  if (!open || !employee) {
    return null;
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  }

  return (

    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">

      <div className="h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl">

        <div className="sticky top-0 border-b bg-white p-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">

                Employee Details

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                Employee Profile

              </p>

            </div>

            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>

          </div>

        </div>

        <div className="space-y-6 p-6">

          <div className="rounded-xl border p-5">

            <div className="mb-5 flex items-center justify-between">

              <h3 className="text-lg font-semibold">

                Employee Information

              </h3>

              {employee.active ? (

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                  Active

                </span>

              ) : (

                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">

                  Inactive

                </span>

              )}

            </div>

            <div className="space-y-4">

              <div>

                <p className="text-xs uppercase text-slate-500">

                  Employee Code

                </p>

                <p className="font-semibold">

                  {employee.employeeCode}

                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">

                  Full Name

                </p>

                <p className="font-semibold">

                  {employee.fullName}

                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">

                  Department

                </p>

                <p>

                  {employee.department?.name || "-"}

                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">

                  Designation

                </p>

                <p>

                  {employee.designation || "-"}

                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">

                  Salary

                </p>

                <p className="text-xl font-bold text-green-700">

                  ₹{employee.salary?.toLocaleString() || "0"}

                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">

                  Email

                </p>

                <p>

                  {employee.email || "-"}

                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">

                  Mobile

                </p>

                <p>

                  {employee.mobile || "-"}

                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">

                  Joined On

                </p>

                <p>

                  {employee.createdAt
                    ? new Date(
                        employee.createdAt
                      ).toLocaleDateString()
                    : "-"}

                </p>

              </div>

            </div>

          </div>          <div className="rounded-xl border p-5">

            <h3 className="mb-4 font-semibold">

              Quick Actions

            </h3>

            <div className="grid gap-3">

              <Button
                variant="outline"
                onClick={() =>
                  copy(employee.employeeCode)
                }
              >
                Copy Employee Code
              </Button>

              {employee.email && (

                <Button
                  variant="outline"
                  onClick={() =>
                    copy(employee.email!)
                  }
                >
                  Copy Email
                </Button>

              )}

              {employee.mobile && (

                <Button
                  variant="outline"
                  onClick={() =>
                    copy(employee.mobile!)
                  }
                >
                  Copy Mobile
                </Button>

              )}

              <Button
                variant="outline"
                onClick={() =>
                  window.print()
                }
              >
                Print Employee
              </Button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}