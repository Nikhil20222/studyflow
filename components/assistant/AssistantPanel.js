"use client";

import { useState } from "react";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { askAssistant } from "@/lib/ai/askAssistant";
import "./AssistantPanel.css";

const sourceLabels = {
  gemini: "Gemini",
  openrouter: "OpenRouter",
  groq: "Groq",
  openai: "OpenAI",
  offline: "Offline Engine",
};

export default function AssistantPanel() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState(null);
  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleAsk(e) {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    const result = await askAssistant(prompt);
    setAnswer(result.text);
    setSource(result.source);
    setLoading(false);
  }

  return (
    <div className="assistant-panel">
      <div className="assistant-panel-header">
        <span className="assistant-panel-icon">
          <Sparkles size={18} />
        </span>
        <div>
          <h2>Ask StudyFlow AI</h2>
          <p>Ask about your plan, weak subjects, streak, or goals.</p>
        </div>
      </div>

      <form className="assistant-form" onSubmit={handleAsk}>
        <input
          type="text"
          placeholder="e.g. What should I study today?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? <Loader2 size={16} className="assistant-spin" /> : <Send size={16} />}
        </button>
      </form>

      {answer && (
        <div className="assistant-answer">
          <p>{answer}</p>
          <span className="assistant-source">{sourceLabels[source] || "Offline Engine"}</span>
        </div>
      )}
    </div>
  );
}
