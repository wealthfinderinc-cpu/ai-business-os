"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function CampaignForm() {
  const [form, setForm] = useState({
    name: "",
    type: "WhatsApp",
    audience: "",
    budget: "",
    startDate: "",
    endDate: "",
    status: "Draft",
  });

  function saveCampaign() {
    toast.success("Campaign Saved");

    setForm({
      name: "",
      type: "WhatsApp",
      audience: "",
      budget: "",
      startDate: "",
      endDate: "",
      status: "Draft",
    });
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Create Campaign
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <Input
          placeholder="Campaign Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <select
          className="rounded-md border p-2"
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
            })
          }
        >
          <option>WhatsApp</option>
          <option>Email</option>
          <option>SMS</option>
          <option>Social Media</option>
        </select>

        <Input
          placeholder="Target Audience"
          value={form.audience}
          onChange={(e) =>
            setForm({
              ...form,
              audience: e.target.value,
            })
          }
        />

        <Input
          type="number"
          placeholder="Budget"
          value={form.budget}
          onChange={(e) =>
            setForm({
              ...form,
              budget: e.target.value,
            })
          }
        />

        <Input
          type="date"
          value={form.startDate}
          onChange={(e) =>
            setForm({
              ...form,
              startDate: e.target.value,
            })
          }
        />

        <Input
          type="date"
          value={form.endDate}
          onChange={(e) =>
            setForm({
              ...form,
              endDate: e.target.value,
            })
          }
        />

        <select
          className="rounded-md border p-2"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value,
            })
          }
        >
          <option>Draft</option>
          <option>Active</option>
          <option>Paused</option>
          <option>Completed</option>
        </select>

      </div>

      <Button
        className="mt-6 w-full"
        onClick={saveCampaign}
      >
        Save Campaign
      </Button>

    </div>
  );
}