import { Plus, CalendarPlus, NotebookPen, Sparkles } from "lucide-react";
import Card from "@/components/ui/Card";
import "./QuickActions.css";

const actions = [
  { label: "Add Task", icon: Plus },
  { label: "Schedule Event", icon: CalendarPlus },
  { label: "New Note", icon: NotebookPen },
  { label: "Ask AI Planner", icon: Sparkles },
];

export default function QuickActions() {
  return (
    <Card title="Quick Actions">
      <div className="action-grid">
        {actions.map(({ label, icon: Icon }) => (
          <button key={label} className="action-button">
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}
