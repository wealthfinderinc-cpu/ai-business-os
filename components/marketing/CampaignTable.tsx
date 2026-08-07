"use client";

import { Button } from "@/components/ui/button";

const campaigns = [
  {
    id: 1,
    name: "WhatsApp August Campaign",
    type: "WhatsApp",
    audience: "Customers",
    budget: 5000,
    status: "Active",
  },
];

export default function CampaignTable() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Campaigns
      </h2>

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-3 text-left">
              Campaign
            </th>

            <th className="p-3 text-left">
              Type
            </th>

            <th className="p-3 text-left">
              Audience
            </th>

            <th className="p-3 text-left">
              Budget
            </th>

            <th className="p-3 text-left">
              Status
            </th>

            <th className="p-3 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {campaigns.map((campaign) => (

            <tr
              key={campaign.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="p-3 font-medium">
                {campaign.name}
              </td>

              <td className="p-3">
                {campaign.type}
              </td>

              <td className="p-3">
                {campaign.audience}
              </td>

              <td className="p-3">
                ₹ {campaign.budget}
              </td>

              <td className="p-3">

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  {campaign.status}
                </span>

              </td>

              <td className="p-3">

                <div className="flex justify-center gap-2">

                  <Button size="sm">
                    View
                  </Button>

                  <Button size="sm">
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                  >
                    Delete
                  </Button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}