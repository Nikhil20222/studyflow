import ProgressBar from "@/components/ui/ProgressBar";
import "./ProgressCard.css";

export default function ProgressCard({ label, percent, color = "#E11D2E" }) {
  return (
    <div className="progress-card-row">
      <div className="progress-card-labels">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <ProgressBar value={percent} color={color} />
    </div>
  );
}
