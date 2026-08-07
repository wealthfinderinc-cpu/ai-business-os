import { api } from "@/lib/api";
import { Campaign } from "@/types";

export const MarketingService = {

  getCampaigns() {
    return api.get<Campaign[]>(
      "/api/marketing/campaigns"
    );
  },

  createCampaign(data: any) {
    return api.post(
      "/api/marketing/campaigns",
      data
    );
  },

  updateCampaign(
    id: number,
    data: any
  ) {
    return api.put(
      `/api/marketing/campaigns/${id}`,
      data
    );
  },

  deleteCampaign(id: number) {
    return api.delete(
      `/api/marketing/campaigns/${id}`
    );
  },

};