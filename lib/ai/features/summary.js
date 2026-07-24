import { askAI } from "@/lib/ai/askAssistant";

function summarizeNoteOffline(note) {
  const sentences = note.content
    .split(/\n|\. /)
    .map((s) => s.trim())
    .filter(Boolean);

  const summary = sentences.slice(0, 2).join(". ");
  return summary ? `${summary}.` : "This note doesn't have enough content to summarize yet.";
}

export async function summarizeNote(note) {
  const prompt = `Summarize this study note in 2-3 short sentences a student can quickly revise from. Title: "${note.title}" (Subject: ${note.subject}). Content: ${note.content}`;

  const result = await askAI(prompt);
  if (result.success && result.text) {
    return { summary: result.text.trim(), source: result.source };
  }

  return { summary: summarizeNoteOffline(note), source: "offline" };
}
