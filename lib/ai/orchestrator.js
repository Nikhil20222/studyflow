import { callGemini } from "./providers/gemini";
import { callOpenRouter } from "./providers/openrouter";
import { callGroq } from "./providers/groq";
import { callOpenAI } from "./providers/openai";

const providers = [
  { name: "gemini", call: callGemini },
  { name: "openrouter", call: callOpenRouter },
  { name: "groq", call: callGroq },
  { name: "openai", call: callOpenAI },
];

export async function getAIResponse(prompt) {
  for (const provider of providers) {
    try {
      const text = await provider.call(prompt);
      if (text) {
        return { success: true, source: provider.name, text };
      }
    } catch (error) {
      console.warn(`StudyFlow AI: ${provider.name} failed, trying next provider.`, error.message);
    }
  }

  return { success: false, source: "none", text: null };
}
