export interface AIResponse {
  text: string;
  data?: any;
}

export interface PromptTemplate {
  id: string;
  name: string;
  description?: string;
  prompt: string;
  tags?: string[];
  createdAt?: string;
}

export interface AIJob {
  id: string;
  type: string;
  prompt: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: AIResponse;
  createdAt?: string;
}
