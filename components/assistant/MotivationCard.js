import { Sparkles } from "lucide-react";
import "./MotivationCard.css";

export default function MotivationCard({ message }) {
  return (
    <div className="motivation-card">
      <span className="motivation-icon">
        <Sparkles size={18} />
      </span>
      <p className="motivation-text">{message}</p>
    </div>
  );
}
