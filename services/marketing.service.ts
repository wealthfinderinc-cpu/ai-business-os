import { api } from "@/lib/api";
import { Campaign, CampaignMetrics, LandingPage, LeadForm } from "@/types/marketing";

export const MarketingService = {
  async listCampaigns(params?: Record<string, any>): Promise<Campaign[]> {
    return api.get<Campaign[]>(`/marketing/campaigns` + (params ? '?'+new URLSearchParams(params).toString() : ''));
  },

  async getCampaign(id: string): Promise<Campaign> {
    return api.get(`/marketing/campaigns/${id}`);
  },

  async createCampaign(data: Partial<Campaign>) {
    return api.post(`/marketing/campaigns`, data);
  },

  async updateCampaign(id: string, data: Partial<Campaign>) {
    return api.put(`/marketing/campaigns/${id}`, data);
  },

  async deleteCampaign(id: string) {
    return api.delete(`/marketing/campaigns/${id}`);
  },

  async listLandingPages(): Promise<LandingPage[]> {
    return api.get(`/marketing/landing-pages`);
  },

  async createLandingPage(data: Partial<LandingPage>) {
    return api.post(`/marketing/landing-pages`, data);
  },

  async listForms(): Promise<LeadForm[]> {
    return api.get(`/marketing/forms`);
  },

  async getCampaignMetrics(id: string): Promise<CampaignMetrics> {
    return api.get(`/marketing/campaigns/${id}/metrics`);
  }
};
