export interface Campaign {
  id: number;

  name: string;

  type: string;

  audience?: string;

  budget?: number;

  status: string;

  startDate?: string;

  endDate?: string;

  createdAt: string;
}

export interface CampaignForm {
  name: string;

  type: string;

  audience?: string;

  budget?: number;

  status: string;

  startDate?: string;

  endDate?: string;
}