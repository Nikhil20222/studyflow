import { askAI } from "@/lib/ai/askAssistant";

const preparedExplanations = {
  "ohm's law":
    "Ohm's Law states that the current through a conductor between two points is directly proportional to the voltage across those points, at constant temperature: V = IR. Doubling the voltage doubles the current if resistance stays the same.",
  integration:
    "Integration is the reverse process of differentiation — it finds the area under a curve or reconstructs a function from its rate of change. The definite integral gives a numeric area, while the indefinite integral gives a family of functions plus a constant C.",
  photosynthesis:
    "Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to produce glucose and oxygen. It happens mainly in the chloroplasts, using chlorophyll to capture light energy.",
  "newton's laws":
    "Newton's three laws describe motion: an object stays at rest or in motion unless a force acts on it (1st law), force equals mass times acceleration, F = ma (2nd law), and every action has an equal and opposite reaction (3rd law).",
  "periodic table":
    "The periodic table arranges elements by increasing atomic number. Elements in the same column (group) share similar chemical properties, while atomic radius and metallic character generally change across a period.",
};

function explainTopicOffline(topic) {
  const key = topic.toLowerCase().trim();
  const matchKey = Object.keys(preparedExplanations).find((k) => key.includes(k));
  if (matchKey) return preparedExplanations[matchKey];

  return `A full explanation for "${topic}" isn't available offline right now. Check your Notes for related material, or try again once AI is available.`;
}

export async function explainTopic(topic) {
  const prompt = `Explain "${topic}" to a student preparing for an exam, in 3-4 simple sentences.`;

  const result = await askAI(prompt);
  if (result.success && result.text) {
    return { explanation: result.text.trim(), source: result.source };
  }

  return { explanation: explainTopicOffline(topic), source: "offline" };
}
