"use client";

import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { LeadService } from "@/services/lead.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
};

type Props = {
  open: boolean;
  lead: Lead | null;
  onClose: () => void;
};

const STATUS = [
  "NEW",
  "CONTACTED",
  "FOLLOW_UP",
  "QUALIFIED",
  "WON",
  "LOST",
];

export default function EditLeadDialog({
  open,
  lead,
  onClose,
}: Props) {

  const queryClient =
    useQueryClient();

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({

      fullName: "",

      mobile: "",

      email: "",

      city: "",

      source: "",

      remarks: "",

      status: "NEW",

    });

  useEffect(() => {

    if (!lead)
      return;

    setForm({

      fullName:
        lead.fullName,

      mobile:
        lead.mobile,

      email:
        lead.email ?? "",

      city:
        lead.city ?? "",

      source:
        lead.source ?? "",

      remarks:
        lead.remarks ?? "",

      status:
        lead.status,

    });

  }, [lead]);

  if (!open || !lead)
    return null;

  async function save() {

    try {

      setSaving(true);

      await LeadService.update(
        lead.id,
        form
      );

      toast.success(
        "Lead updated successfully."
      );

      queryClient.invalidateQueries({
        queryKey: [
          "leads",
        ],
      });

      onClose();

    } catch (error: any) {

      toast.error(
        error?.message ??
          "Unable to update lead."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-semibold">

            Edit Lead

          </h2>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>

        </div>

        <div className="space-y-4">

          <Input
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e)=>
              setForm({
                ...form,
                fullName: e.target.value,
              })
            }
          />

          <Input
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e)=>
              setForm({
                ...form,
                mobile: e.target.value,
              })
            }
          />

          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e)=>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />          <Input
            placeholder="City"
            value={form.city}
            onChange={(e) =>
              setForm({
                ...form,
                city: e.target.value,
              })
            }
          />

          <Input
            placeholder="Lead Source"
            value={form.source}
            onChange={(e) =>
              setForm({
                ...form,
                source: e.target.value,
              })
            }
          />

          <Input
            placeholder="Remarks"
            value={form.remarks}
            onChange={(e) =>
              setForm({
                ...form,
                remarks: e.target.value,
              })
            }
          />

          <div>

            <label className="mb-2 block text-sm font-medium">
              Lead Status
            </label>

            <select
              className="w-full rounded-md border px-3 py-2"
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
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

          </div>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <Button
            variant="outline"
            disabled={saving}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            disabled={saving}
            onClick={save}
          >
            {saving
              ? "Saving..."
              : "Update Lead"}
          </Button>

        </div>

      </div>

    </div>

  );

}