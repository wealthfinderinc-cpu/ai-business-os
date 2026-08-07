import OpenAI from "openai";

declare global {
  // eslint-disable-next-line no-var
  var openai: OpenAI | undefined;
}

export const openai =
  global.openai ??
  new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

if (process.env.NODE_ENV !== "production") {
  global.openai = openai;
}

export default openai;