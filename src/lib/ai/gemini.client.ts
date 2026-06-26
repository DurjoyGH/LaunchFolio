import OpenAI from "openai";

let client: OpenAI | null = null;

const getClient = () => {
  if (client) return client;
  client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.AI_API_KEY,
  });
  return client;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const generateText = async (prompt: string, maxRetries = 3): Promise<string> => {
  const ai = getClient();
  const model = process.env.AI_MODEL || "deepseek-v4-flash";

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        stream: false,
      });
      return response.choices[0].message.content || "";
    } catch (err: any) {
      const status = err.status || err.response?.status;
      const isRateLimit = status === 429;

      if (isRateLimit && attempt < maxRetries) {
        const waitMs = (attempt + 1) * 30000;
        console.log(`[AI] Rate limited. Waiting ${waitMs / 1000}s before retry ${attempt + 1}/${maxRetries}...`);
        await sleep(waitMs);
        continue;
      }
      throw err;
    }
  }
  return "";
};

export const generateJSON = async (prompt: string): Promise<any> => {
  const text = await generateText(
    `${prompt}\n\nIMPORTANT: Respond ONLY with valid JSON. No markdown, no explanations, no code fences.`
  );

  const cleaned = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

  return JSON.parse(cleaned);
};
