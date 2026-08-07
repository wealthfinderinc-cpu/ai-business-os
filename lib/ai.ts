// lib/ai.ts

export function buildPrompt(
  title: string,
  description: string
) {
  return `
Title:
${title}

Description:
${description}
`;
}

export function truncateResponse(
  text: string,
  limit = 300
) {
  if (text.length <= limit) {
    return text;
  }

  return text.substring(0, limit) + "...";
}