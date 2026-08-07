import { api } from '@/lib/api';
import { AIResponse } from '@/types/ai';

export const AIService = {
  chat: async (prompt: string) => api.post<AIResponse>('/ai/chat', { prompt }),
  salesCoach: async (prompt: string) => api.post<AIResponse>('/ai/sales-coach', { prompt }),
  report: async (prompt: string) => api.post<AIResponse>('/ai/report', { prompt }),
  proposal: async (prompt: string) => api.post<AIResponse>('/ai/proposal', { prompt }),
  content: async (prompt: string) => api.post<AIResponse>('/ai/content', { prompt })
};
