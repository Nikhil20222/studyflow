import { askAI } from "@/lib/ai/askAssistant";
import { tryParseJSON } from "@/lib/ai/parseJSON";

function generateFlashcardsOffline(note) {
  const lines = note.content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const cards = lines.slice(0, 5).map((line) => {
    if (line.includes(":")) {
      const [term, ...rest] = line.split(":");
      const definition = rest.join(":").trim();
      if (definition) {
        return { question: `What is ${term.trim()}?`, answer: definition };
      }
    }
    return { question: `Key point from ${note.title}`, answer: line };
  });

  return cards.length > 0
    ? cards
    : [{ question: `What is ${note.title} about?`, answer: "Review the note content directly." }];
}

export async function generateFlashcards(note) {
  const prompt = `Create exactly 5 flashcards from this study note. Reply ONLY with a JSON array like [{"question":"...","answer":"..."}] and nothing else — no markdown, no explanation. Title: ${note.title}. Subject: ${note.subject}. Content: ${note.content}`;

  const result = await askAI(prompt);
  if (result.success && result.text) {
    const parsed = tryParseJSON(result.text);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return { cards: parsed, source: result.source };
    }
  }

  return { cards: generateFlashcardsOffline(note), source: "offline" };
}
