import { getOfflineAnswer } from "@/lib/ai/offlineEngine";

export async function askAssistant(prompt) {
  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.text) {
        return { text: data.text, source: data.source };
      }
    }
  } catch (error) {
    console.warn("StudyFlow AI: request failed, using offline engine.", error.message);
  }

  return { text: getOfflineAnswer(prompt), source: "offline" };
}
