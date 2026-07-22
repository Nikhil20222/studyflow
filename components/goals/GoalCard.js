import { Pencil, Trash2, CheckCircle2, CalendarDays } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import "./GoalCard.css";

const subjectColors = {
  Physics: "#3E8EED",
  Chemistry: "#2FBF71",
  Mathematics: "#E11D2E",
  English: "#E0A72A",
  "Computer Science": "#9B59F6",
};

export default function GoalCard({ goal, onEdit, onDelete, onToggleComplete }) {
  const color = subjectColors[goal.subject] || "#8A8A93";

  return (
    <div className={goal.completed ? "goal-tile completed" : "goal-tile"}>
      <div className="goal-tile-top">
        <span className="goal-tile-subject" style={{ color, borderColor: color }}>
          {goal.subject}
        </span>
        <span className={goal.completed ? "goal-tile-status done" : "goal-tile-status"}>
          {goal.completed ? "Completed" : "Active"}
        </span>
      </div>

      <h3 className="goal-tile-title">{goal.title}</h3>

      <div className="goal-tile-deadline">
        <CalendarDays size={13} />
        <span>{goal.deadline}</span>
      </div>

      <div className="goal-tile-progress">
        <div className="goal-tile-progress-labels">
          <span>Progress</span>
          <span>{goal.progress}%</span>
        </div>
        <ProgressBar value={goal.progress} color={goal.completed ? "#2FBF71" : "#E11D2E"} />
      </div>

      <div className="goal-tile-actions">
        <button
          className={goal.completed ? "goal-tile-button active" : "goal-tile-button"}
          onClick={() => onToggleComplete(goal.id)}
        >
          <CheckCircle2 size={14} />
          {goal.completed ? "Reopen" : "Mark Complete"}
        </button>
        <button className="goal-tile-icon" onClick={() => onEdit(goal)}>
          <Pencil size={14} />
        </button>
        <button className="goal-tile-icon danger" onClick={() => onDelete(goal.id)}>
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
