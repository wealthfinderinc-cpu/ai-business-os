import { api } from "@/lib/api";
import {
  AIRequest,
  AIResponse,
  AIConversation,
} from "@/types";

export const AIService = {

  chat(data: AIRequest) {
    return api.post<AIResponse>(
      "/api/ai/chat",
      data
    );
  },

  history() {
    return api.get<AIConversation[]>(
      "/api/ai/history"
    );
  },

  prompts() {
    return api.get(
      "/api/ai/prompts"
    );
  },

  reports() {
    return api.get(
      "/api/ai/reports"
    );
  },

};