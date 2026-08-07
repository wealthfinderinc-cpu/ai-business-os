"use client";

import { Button } from "@/components/ui/button";

type Campaign = {
  name: string;
  type: string;
  audience: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: string;
};

type Props = {
  open: boolean;
  campaign: Campaign | null;
  onClose: () => void;
};

export default function CampaignDetailsDrawer({
  open,
  campaign,
  onClose,
}: Props) {
  if (!open || !campaign) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 z-50 h-screen w-[520px] overflow-y-auto border-l bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Campaign Details
          </h2>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>

        </div>

        <div className="space-y-5">

          <div>
            <p className="text-sm text-slate-500">
              Campaign
            </p>

            <h3 className="text-2xl font-bold">
              {campaign.name}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>
              <p className="text-sm text-slate-500">
                Type
              </p>
              <p>{campaign.type}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Audience
              </p>
              <p>{campaign.audience}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Budget
              </p>
              <p>₹ {campaign.budget}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Status
              </p>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                {campaign.status}
              </span>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Start Date
              </p>
              <p>{campaign.startDate}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                End Date
              </p>
              <p>{campaign.endDate}</p>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}