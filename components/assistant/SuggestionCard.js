import { Lightbulb } from "lucide-react";
import "./SuggestionCard.css";

export default function SuggestionCard({ text }) {
  return (
    <div className="suggestion-item">
      <span className="suggestion-icon">
        <Lightbulb size={14} />
      </span>
      <p>{text}</p>
    </div>
  );
}
