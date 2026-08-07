"use client";

import { Button } from "@/components/ui/button";

export default function DeleteCampaignDialog() {
  return (
    <div className="rounded-xl border bg-white p-10 text-center shadow">

      <h2 className="text-2xl font-bold text-red-600">
        Delete Campaign
      </h2>

      <p className="mt-3 text-slate-500">
        Campaign delete confirmation will be connected in the next phase.
      </p>

      <Button
        className="mt-6"
        variant="destructive"
      >
        Delete Campaign
      </Button>

    </div>
  );
}