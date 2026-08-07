import { api } from '@/lib/api';
import { Conversation, WhatsAppMessage, Template, Broadcast, WhatsAppContact } from '@/types/whatsapp';

export const WhatsAppService = {
  async listConversations(): Promise<Conversation[]> {
    return api.get('/whatsapp/conversations');
  },

  async getMessages(conversationId: string): Promise<WhatsAppMessage[]> {
    return api.get(`/whatsapp/conversations/${conversationId}/messages`);
  },

  async sendMessage(conversationId: string, payload: Partial<WhatsAppMessage>) {
    return api.post(`/whatsapp/conversations/${conversationId}/messages`, payload);
  },

  async listTemplates(): Promise<Template[]> {
    return api.get('/whatsapp/templates');
  },

  async createTemplate(data: Partial<Template>) {
    return api.post('/whatsapp/templates', data);
  },

  async listContacts(): Promise<WhatsAppContact[]> {
    return api.get('/whatsapp/contacts');
  },

  async createBroadcast(data: Partial<Broadcast>) {
    return api.post('/whatsapp/broadcasts', data);
  },

  async listBroadcasts(): Promise<Broadcast[]> {
    return api.get('/whatsapp/broadcasts');
  }
};
