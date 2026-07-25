import { askAI } from "@/lib/ai/askAssistant";
import { tryParseJSON } from "@/lib/ai/parseJSON";

const subjects = ["Physics", "Chemistry", "Mathematics", "English", "Computer Science"];

function generateQuizOffline({ subject, topic, noteContent, types }) {
  const label = topic || subject || "your syllabus";
  const lines = (noteContent || "")
    .split(/\n|\. /)
    .map((line) => line.trim())
    .filter(Boolean);

  const questions = [];

  if (types.includes("MCQ")) {
    questions.push({
      type: "MCQ",
      question: `Which subject does "${label}" belong to?`,
      options: subjects,
      answer: subjects.includes(subject) ? subject : subjects[0],
    });
  }

  if (types.includes("True/False")) {
    const statement = lines[0] || `${label} is worth revising before your next test.`;
    questions.push({ type: "True/False", question: statement, options: ["True", "False"], answer: "True" });
  }

  if (types.includes("Short Answer")) {
    questions.push({
      type: "Short Answer",
      question: `In your own words, explain the key idea behind ${label}.`,
      answer: lines[1] || "Review your notes for the exact answer.",
    });
  }

  while (questions.length < 4) {
    questions.push({
      type: "MCQ",
      question: `How confident do you feel about ${label}?`,
      options: ["Very confident", "Somewhat confident", "Need more revision", "Not confident"],
      answer: "Somewhat confident",
    });
  }

  return questions;
}

export async function generateQuiz({ subject, topic, noteContent, types }) {
  const activeTypes = types && types.length > 0 ? types : ["MCQ", "True/False", "Short Answer"];
  const label = topic || subject || "the syllabus";

  const prompt = `Create a short quiz (4 questions) about "${label}" using only these question types: ${activeTypes.join(
    ", "
  )}. Reply ONLY with a JSON array like [{"type":"MCQ","question":"...","options":["A","B","C","D"],"answer":"..."}]. For True/False use options ["True","False"]. For Short Answer, omit "options". Context: ${
    noteContent || "General syllabus knowledge."
  }`;

  const result = await askAI(prompt);
  if (result.success && result.text) {
    const parsed = tryParseJSON(result.text);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return { questions: parsed, source: result.source };
    }
  }

  return {
    questions: generateQuizOffline({ subject, topic, noteContent, types: activeTypes }),
    source: "offline",
  };
}
