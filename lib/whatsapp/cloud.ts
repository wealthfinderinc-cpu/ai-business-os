// WhatsApp Cloud API adapter (server-side)
// This file is a server-side stub demonstrating where to add calls to WhatsApp Cloud API.

import fetch from 'node-fetch';

const WHATSAPP_API_BASE = 'https://graph.facebook.com/v17.0';

export async function sendWhatsAppMessage(accessToken: string, phoneNumberId: string, payload: any) {
  // POST /{phone-number-id}/messages
  const res = await fetch(`${WHATSAPP_API_BASE}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || 'WhatsApp API error');
  return data;
}

export async function listWhatsAppPhoneNumbers(accessToken: string, businessId: string) {
  // Example endpoint: /{business-id}/owned_phone_numbers
  return [];
}
