"use client";

import { Button } from "@/components/ui/button";

type Lead = {
  id: number;
  leadId: string;
  fullName: string;
  mobile: string;
  email?: string | null;
  city?: string | null;
  source?: string | null;
  remarks?: string | null;
  status: string;
  createdAt?: string;
};

type Props = {
  open: boolean;
  lead: Lead | null;
  onClose: () => void;
};

export default function LeadDetailsDrawer({
  open,
  lead,
  onClose,
}: Props) {

  if (!open || !lead) {
    return null;
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  }

  function statusColor(status: string) {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-700";

      case "CONTACTED":
        return "bg-yellow-100 text-yellow-700";

      case "FOLLOW_UP":
        return "bg-orange-100 text-orange-700";

      case "QUALIFIED":
        return "bg-purple-100 text-purple-700";

      case "WON":
        return "bg-green-100 text-green-700";

      case "LOST":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  return (

    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">

      <div className="h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl">

        <div className="sticky top-0 flex items-center justify-between border-b bg-white p-6">

          <div>

            <h2 className="text-2xl font-semibold">
              Lead Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {lead.leadId}
            </p>

          </div>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>

        </div>

        <div className="space-y-6 p-6">

          <div className="rounded-xl border p-4">

            <div className="mb-4 flex items-center justify-between">

              <h3 className="font-semibold">
                Lead Summary
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor(
                  lead.status
                )}`}
              >
                {lead.status}
              </span>

            </div>

            <div className="space-y-4">

              <div>

                <p className="text-xs uppercase text-slate-500">
                  Full Name
                </p>

                <p className="font-medium">
                  {lead.fullName}
                </p>

              </div>

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    Mobile
                  </p>

                  <p>{lead.mobile}</p>

                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    copy(lead.mobile)
                  }
                >
                  Copy
                </Button>

              </div>

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    Email
                  </p>

                  <p>
                    {lead.email || "-"}
                  </p>

                </div>

                {lead.email && (

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copy(lead.email!)
                    }
                  >
                    Copy
                  </Button>

                )}

              </div>              <div className="grid gap-4 md:grid-cols-2">

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    City
                  </p>

                  <p>
                    {lead.city || "-"}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    Source
                  </p>

                  <p>
                    {lead.source || "-"}
                  </p>

                </div>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">
                  Remarks
                </p>

                <p className="whitespace-pre-wrap">
                  {lead.remarks || "-"}
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-xl border p-4">

            <h3 className="mb-4 font-semibold">
              Lead Information
            </h3>

            <div className="space-y-4">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    Lead ID
                  </p>

                  <p className="font-medium">
                    {lead.leadId}
                  </p>

                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    copy(lead.leadId)
                  }
                >
                  Copy
                </Button>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">
                  Created On
                </p>

                <p>
                  {lead.createdAt
                    ? new Date(
                        lead.createdAt
                      ).toLocaleString()
                    : "-"}
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-xl border p-4">

            <h3 className="mb-4 font-semibold">
              Quick Actions
            </h3>

            <div className="grid grid-cols-2 gap-3">

              <Button
                variant="outline"
                onClick={() =>
                  copy(lead.mobile)
                }
              >
                Copy Mobile
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  copy(lead.leadId)
                }
              >
                Copy Lead ID
              </Button>

              {lead.email && (
                <Button
                  variant="outline"
                  className="col-span-2"
                  onClick={() =>
                    copy(lead.email!)
                  }
                >
                  Copy Email
                </Button>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}