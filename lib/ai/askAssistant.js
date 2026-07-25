import { getOfflineAnswer } from "@/lib/ai/offlineEngine";

// Raw call to the provider chain, with no offline fallback baked in.
// Feature-specific code (flashcards, quiz, etc.) uses this so it can
// decide its own structured fallback instead of a generic text answer.
export async function askAI(prompt) {
  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.text) {
        return { success: true, text: data.text, source: data.source };
      }
    }
  } catch (error) {
    console.warn("StudyFlow AI: request failed.", error.message);
  }

  return { success: false, text: null, source: null };
}

export async function askAssistant(prompt) {
  const result = await askAI(prompt);
  if (result.success) return { text: result.text, source: result.source };

  return { text: getOfflineAnswer(prompt), source: "offline" };
}
