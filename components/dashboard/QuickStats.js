import { Clock, CheckCircle2, TrendingUp, BookOpen } from "lucide-react";
import Card from "@/components/ui/Card";
import "./QuickStats.css";

const stats = [
  {
    label: "Hours Today",
    value: "3.5",
    trend: "+0.8 from yesterday",
    icon: Clock,
    positive: true,
  },
  {
    label: "Tasks Completed",
    value: "6/10",
    trend: "60% done",
    icon: CheckCircle2,
    positive: true,
  },
  {
    label: "Syllabus Progress",
    value: "68%",
    trend: "+3% this week",
    icon: TrendingUp,
    positive: true,
  },
  {
    label: "Active Subjects",
    value: "5",
    trend: "Physics needs focus",
    icon: BookOpen,
    positive: false,
  },
];

export default function QuickStats() {
  return (
    <div className="stats">
      {stats.map(({ label, value, trend, icon: Icon, positive }) => (
        <Card key={label} className="stat-card">
          <div className="stat-top">
            <span className="stat-label">{label}</span>
            <Icon size={16} />
          </div>
          <p className="stat-value">{value}</p>
          <p className={positive ? "stat-trend up" : "stat-trend down"}>{trend}</p>
        </Card>
      ))}
    </div>
  );
}
