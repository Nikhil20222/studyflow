import { askAI } from "@/lib/ai/askAssistant";
import { getOfflineAnswer } from "@/lib/ai/offlineEngine";

export async function solveDoubt(question) {
  const prompt = `A student has this doubt: "${question}". Answer clearly in 2-4 sentences, and suggest what to revise next if relevant.`;

  const result = await askAI(prompt);
  if (result.success && result.text) {
    return { answer: result.text.trim(), source: result.source };
  }

  return { answer: getOfflineAnswer(question), source: "offline" };
}
