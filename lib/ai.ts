// Server-side OpenAI adapter (minimal)

const OPENAI_API = 'https://api.openai.com/v1/chat/completions';

export async function generateText(prompt: string, options: { model?: string; system?: string } = {}) {
  const key = process.env.OPENAI_API_KEY;
  const model = options.model ?? process.env.AI_MODEL ?? 'gpt-4o-mini';

  if (!key) {
    // Fallback: return a deterministic canned response for local/dev
    return `AI not configured: would respond to prompt: ${prompt.slice(0, 200)}`;
  }

  const body = {
    model,
    messages: [
      ...(options.system ? [{ role: 'system', content: options.system }] : []),
      { role: 'user', content: prompt }
    ],
    temperature: 0.2,
    max_tokens: 1200
  };

  const res = await fetch(OPENAI_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${text}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? '';
  return content;
}
