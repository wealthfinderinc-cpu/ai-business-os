export type AIChatRequest = {
  prompt: string;
};

export type AIChatResponse = {
  success: boolean;
  response: string;
};

export type AIMessage = {
  role: "user" | "assistant";
  content: string;
};