const axios = require("axios");

const JINA_CHAT_URL =
  process.env.JINA_CHAT_URL || "https://api.jina.ai/v1/chat/completions";
const JINA_MODEL = process.env.JINA_CHAT_MODEL || "jina-chat";
const JINA_TIMEOUT_MS = Number(process.env.JINA_TIMEOUT_MS || 15000);

const normalizeKeyword = (text) => {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/^[\-\*\d\.\)\s]+/, "")
    .replace(/^["']|["']$/g, "")
    .trim();
};

const parseKeywords = (content) => {
  if (!content || typeof content !== "string") return [];
  const trimmed = content.trim();

  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map(normalizeKeyword).filter(Boolean);
      }
    } catch (err) {
      // Fall through to text parsing
    }
  }

  return trimmed
    .split(/\n|,|;|\|/g)
    .map(normalizeKeyword)
    .filter(Boolean);
};

const getRoleKeywords = async (skills = []) => {
  const inputSkills = Array.isArray(skills) ? skills : [];
  if (inputSkills.length === 0) return [];

  const payload = {
    model: JINA_MODEL,
    messages: [
      {
        role: "system",
        content:
          "Return ONLY a JSON array (no other text). Provide 5 to 6 concise job role keywords inferred from the given skills. Use generic role titles (e.g., 'frontend developer', 'data analyst', 'civil engineer') that best fit the skills. Do not include explanations, sentences, or any extra words.",
      },
      {
        role: "user",
        content: `Skills: ${inputSkills.join(", ")}\nOutput: JSON array of role keywords only.`,
      },
    ],
  };

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.JINA_API_KEY}`,
      "Content-Type": "application/json",
    },
    timeout: JINA_TIMEOUT_MS,
  };

  let response;
  try {
    response = await axios.post(JINA_CHAT_URL, payload, config);
  } catch (err) {
    // Retry once for transient timeouts
    if (err?.code === "ECONNABORTED") {
      response = await axios.post(JINA_CHAT_URL, payload, config);
    } else {
      throw err;
    }
  }

  const content = response?.data?.choices?.[0]?.message?.content || "";
  const keywords = parseKeywords(content);

  const unique = Array.from(new Set(keywords.map(k => k.toLowerCase()))).map(
    k => keywords.find(orig => orig.toLowerCase() === k)
  );

  return unique.slice(0, 6);
};

module.exports = { getRoleKeywords };
