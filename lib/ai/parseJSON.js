export function tryParseJSON(text) {
  if (!text) return null;

  const cleaned = text
    .trim()
    .replace(/^```json/i, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    return null;
  }
}
