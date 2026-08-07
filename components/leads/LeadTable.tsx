"use client";

import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useLeads } from "@/hooks/useLeads";
import { LeadService } from "@/services/lead.service";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import EditLeadDialog from "./EditLeadDialog";
import LeadDetailsDrawer from "./LeadDetailsDrawer";

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

const STATUS = [
  "NEW",
  "CONTACTED",
  "FOLLOW_UP",
  "QUALIFIED",
  "WON",
  "LOST",
];

export default function LeadTable() {

  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useLeads();

  const leads: Lead[] =
    (data as any)?.data ??
    (Array.isArray(data) ? data : []);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [editOpen, setEditOpen] =
    useState(false);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [selectedLead, setSelectedLead] =
    useState<Lead | null>(null);

  const filteredLeads = useMemo(() => {

    const keyword =
      search.trim().toLowerCase();

    return leads.filter((lead) => {

      const matchesSearch =
        lead.fullName
          .toLowerCase()
          .includes(keyword) ||

        lead.mobile
          .toLowerCase()
          .includes(keyword) ||

        (lead.city ?? "")
          .toLowerCase()
          .includes(keyword) ||

        (lead.email ?? "")
          .toLowerCase()
          .includes(keyword);

      const matchesStatus =
        statusFilter === "ALL"
          ? true
          : lead.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );

    });

  }, [
    leads,
    search,
    statusFilter,
  ]);

  async function handleDelete(id: number) {

    if (
      !window.confirm(
        "Delete this lead?"
      )
    )
      return;

    try {

      await LeadService.delete(id);

      toast.success(
        "Lead deleted successfully."
      );

      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to delete lead."
      );

    }

  }

  async function handleStatusChange(
    id: number,
    status: string
  ) {

    try {

      await LeadService.update(id, {
        status,
      });

      toast.success(
        "Lead status updated."
      );

      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to update status."
      );

    }

  }

  function handleEdit(
    lead: Lead
  ) {

    setSelectedLead(lead);

    setEditOpen(true);

  }

  function handleView(
    lead: Lead
  ) {

    setSelectedLead(lead);

    setDrawerOpen(true);

  }

  if (isLoading) {

    return (
      <div className="rounded-xl border bg-white p-8">

        <div className="flex justify-center py-10">

          Loading Leads...

        </div>

      </div>
    );

  }

  if (isError) {

    return (

      <div className="rounded-xl border bg-white p-8">

        <div className="space-y-4 text-center">

          <p>
            Unable to load leads.
          </p>

          <Button
            onClick={() =>
              refetch()
            }
          >
            Retry
          </Button>

        </div>

      </div>

    );

  }

  return (

    <>

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center justify-between gap-4">

          <div>

            <h2 className="text-2xl font-semibold">
              Leads
            </h2>

            <p className="text-sm text-slate-500">
              Total Records :
              {" "}
              {filteredLeads.length}
            </p>

          </div>

          <div className="flex gap-3">

            <Input
              className="w-72"
              placeholder="Search Lead..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            <select
              className="rounded-md border px-3"
              value={statusFilter}
              onChange={(e)=>
                setStatusFilter(
                  e.target.value
                )
              }
            >
              <option value="ALL">
                All
              </option>

              {STATUS.map((status)=>(
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}

            </select>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">            <thead className="bg-slate-100">

              <tr>

                <th className="border px-4 py-3 text-left">
                  Lead ID
                </th>

                <th className="border px-4 py-3 text-left">
                  Name
                </th>

                <th className="border px-4 py-3 text-left">
                  Mobile
                </th>

                <th className="border px-4 py-3 text-left">
                  City
                </th>

                <th className="border px-4 py-3 text-left">
                  Source
                </th>

                <th className="border px-4 py-3 text-center">
                  Status
                </th>

                <th className="border px-4 py-3 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredLeads.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="py-12 text-center text-slate-500"
                  >
                    No Leads Found
                  </td>

                </tr>

              ) : (

                filteredLeads.map((lead) => (

                  <tr
                    key={lead.id}
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() =>
                      handleView(lead)
                    }
                  >

                    <td className="border px-4 py-3">
                      {lead.leadId}
                    </td>

                    <td className="border px-4 py-3 font-medium">
                      {lead.fullName}
                    </td>

                    <td className="border px-4 py-3">
                      {lead.mobile}
                    </td>

                    <td className="border px-4 py-3">
                      {lead.city || "-"}
                    </td>

                    <td className="border px-4 py-3">
                      {lead.source || "-"}
                    </td>

                    <td
                      className="border px-4 py-3"
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >

                      <select
                        className="w-full rounded-md border px-2 py-2"
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(
                            lead.id,
                            e.target.value
                          )
                        }
                      >

                        {STATUS.map((status) => (

                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>

                        ))}

                      </select>

                    </td>

                    <td
                      className="border px-4 py-3"
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >

                      <div className="flex justify-center gap-2">

                        <Button
                          size="sm"
                          onClick={() =>
                            handleEdit(lead)
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            handleDelete(
                              lead.id
                            )
                          }
                        >
                          Delete
                        </Button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>      <EditLeadDialog
        open={editOpen}
        lead={selectedLead}
        onClose={() => {
          setEditOpen(false);
          setSelectedLead(null);

          queryClient.invalidateQueries({
            queryKey: ["leads"],
          });
        }}
      />

      <LeadDetailsDrawer
        open={drawerOpen}
        lead={selectedLead}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedLead(null);
        }}
      />

    </>

  );

}