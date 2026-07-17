import { CheckCircle2, FileText, Target, BookOpen } from "lucide-react";
import Card from "@/components/ui/Card";
import "./RecentActivity.css";

const activity = [
  { icon: CheckCircle2, text: "Completed 'Thermodynamics basics' task", time: "2h ago" },
  { icon: FileText, text: "Added note to Organic Chemistry", time: "4h ago" },
  { icon: Target, text: "Reached weekly goal: 20 hours of study", time: "Yesterday" },
  { icon: BookOpen, text: "Marked Calculus chapter as complete", time: "Yesterday" },
];

export default function RecentActivity() {
  return (
    <Card title="Recent Activity">
      <ul className="activity-list">
        {activity.map((item, index) => {
          const Icon = item.icon;
          return (
            <li key={index} className="activity-item">
              <span className="activity-icon">
                <Icon size={14} />
              </span>
              <div className="activity-info">
                <p className="activity-text">{item.text}</p>
                <span className="activity-time">{item.time}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
