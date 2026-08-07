"use client";

import React, { useEffect, useState } from "react";
import { Campaign } from "@/types/marketing";
import { MarketingService } from "@/services/marketing.service";
import CampaignForm from "./CampaignForm";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function CampaignManager() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Campaign | null>(null);

  useEffect(() => {
    setLoading(true);
    MarketingService.listCampaigns()
      .then((res) => setCampaigns(res || []))
      .catch((err) => toast.error("Failed to load campaigns"))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (data: Partial<Campaign>) => {
    try {
      const created = await MarketingService.createCampaign(data);
      setCampaigns((c) => [created, ...c]);
      toast.success("Campaign created");
    } catch (err) {
      toast.error("Failed to create campaign");
    }
  };

  const handleUpdate = async (id: string, data: Partial<Campaign>) => {
    try {
      const updated = await MarketingService.updateCampaign(id, data);
      setCampaigns((c) => c.map(x => x.id === id ? updated : x));
      toast.success("Campaign updated");
    } catch (err) {
      toast.error("Failed to update campaign");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await MarketingService.deleteCampaign(id);
      setCampaigns((c) => c.filter(x => x.id !== id));
      toast.success("Campaign deleted");
    } catch (err) {
      toast.error("Failed to delete campaign");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Campaign Manager</h2>
        <div className="flex items-center gap-2">
          <Button onClick={() => setEditing({} as Campaign)}>New Campaign</Button>
        </div>
      </div>

      <div className="space-y-2">
        {loading ? (
          <div className="skeleton h-40" />
        ) : (
          campaigns.map((c) => (
            <div key={c.id} className="card flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">{c.name}</div>
                <div className="text-xs text-slate-500">{c.provider} · {c.status}</div>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => setEditing(c)}>Edit</Button>
                <Button onClick={() => handleDelete(c.id)} className="btn-ghost">Delete</Button>
              </div>
            </div>
          ))
        )}
      </div>

      {editing && (
        <CampaignForm
          initial={editing}
          onClose={() => setEditing(null)}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
