"use client";

import { useMutation } from "@tanstack/react-query";
import { AIService } from "@/services/ai.service";

export function useAI() {
  return useMutation({
    mutationFn: AIService.chat,
  });
}