import { Target } from "lucide-react";
import Card from "@/components/ui/Card";
import "./TodaysGoal.css";

export default function TodaysGoal() {
  const targetHours = 6;
  const completedHours = 3.5;
  const remainingHours = targetHours - completedHours;
  const percent = Math.round((completedHours / targetHours) * 100);

  return (
    <Card className="goal-card">
      <div className="goal-top">
        <span className="goal-icon">
          <Target size={18} />
        </span>
        <span className="goal-label">Today's Goal</span>
      </div>

      <div className="goal-hours">
        <span className="goal-completed">{completedHours}h</span>
        <span className="goal-target">/ {targetHours}h target</span>
      </div>

      <div className="goal-track">
        <div className="goal-fill" style={{ width: `${percent}%` }} />
      </div>

      <div className="goal-footer">
        <span>{percent}% complete</span>
        <span>{remainingHours}h remaining</span>
      </div>
    </Card>
  );
}
