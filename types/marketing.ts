export interface AdAccount {
  id: string;
  name: string;
  provider: 'facebook' | 'instagram' | 'google';
  connectedAt?: string | null;
}

export interface AdCreative {
  id: string;
  title: string;
  body?: string;
  image?: string;
  url?: string;
}

export type CampaignStatus = 'DRAFT' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED';

export interface Campaign {
  id: string;
  name: string;
  provider: 'facebook' | 'instagram' | 'google' | 'email' | 'sms' | 'whatsapp';
  accountId?: string | null;
  budget?: number;
  currency?: string;
  startDate?: string | null;
  endDate?: string | null;
  status: CampaignStatus;
  tags?: string[];
  creatives?: AdCreative[];
  landingPageId?: string | null;
  formId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface LeadFormField {
  id: string;
  label: string;
  name: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea' | 'number' | 'date';
  required?: boolean;
  options?: string[];
}

export interface LeadForm {
  id: string;
  name: string;
  fields: LeadFormField[];
  createdAt?: string;
}

export interface LandingPage {
  id: string;
  name: string;
  slug: string;
  html?: string;
  published?: boolean;
  createdAt?: string;
}

export interface CampaignMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  leads: number;
}

export interface AggregatedMetrics {
  cpl: number; // cost per lead
  cac: number; // customer acquisition cost
  conversionRate: number;
  roi: number;
}
