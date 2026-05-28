const OpenAI = require("openai");

let client = null;

const getClient = () => {
  if (client) return client;
  client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.AI_API_KEY,
  });
  return client;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Call DeepSeek and return plain text response.
 * Auto-retries on rate-limit (429) errors.
 * @param {string} prompt
 * @param {number} maxRetries
 * @returns {Promise<string>}
 */
const generateText = async (prompt, maxRetries = 3) => {
  const ai = getClient();
  const model = process.env.AI_MODEL || "deepseek-v4-flash";

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        stream: false,
      });
      return response.choices[0].message.content;
    } catch (err) {
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
};

/**
 * Call DeepSeek and parse JSON from response.
 * @param {string} prompt
 * @returns {Promise<Object>}
 */
const generateJSON = async (prompt) => {
  const text = await generateText(
    `${prompt}\n\nIMPORTANT: Respond ONLY with valid JSON. No markdown, no explanations, no code fences.`
  );

  // Strip any accidental markdown code fences
  const cleaned = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

  return JSON.parse(cleaned);
};

module.exports = { generateText, generateJSON };
