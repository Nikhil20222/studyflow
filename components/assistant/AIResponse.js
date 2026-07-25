import { Loader2 } from "lucide-react";
import "./AIResponse.css";

const sourceLabels = {
  gemini: "Gemini" ,
  openrouter: "OpenRouter",
  groq: "Groq",
  openai: "OpenAI",
  offline: "Offline Engine",
};

export default function AIResponse({ text, source, loading}) {
  if (loading) {
    return (
      <div className="ai-response loading">
        <Loader2 size={16} className= "ai-response-spin"/>
        <span>Thinking...</span>
      </div>
    );
  }

  if (!text) return null;

  return (
    <div className="ai-response">
      <p>{text}</p>
      <span className="ai-response-source">{sourceLabels[source] || "Offline Engine" }</span>
    </div>
  );
}