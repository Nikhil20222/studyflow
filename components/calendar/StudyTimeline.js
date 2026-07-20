import { BookOpen, CheckSquare, GraduationCap } from "lucide-react";
import "./StudyTimeline.css";

const timeline = [
  { time: "7:00 AM", title: "Physics — Rotational Dynamics", type: "session", icon: BookOpen },
  { time: "1:00 PM", title: "Mathematics — Integration set 4", type: "session", icon: BookOpen },
  { time: "3:30 PM", title: "Submit Chemistry lab report", type: "task", icon: CheckSquare },
  { time: "6:00 PM", title: "Computer Science — Data structures", type: "session", icon: BookOpen },
  { time: "8:00 PM", title: "Chemistry Unit Test", type: "exam", icon: GraduationCap },
];

export default function StudyTimeline() {
  return (
    <div className="timeline">
      <div className="timeline-line" />

      {timeline.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="timeline-item"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <span className={`timeline-node ${item.type}`}>
              <Icon size={13} />
            </span>
            <div className="timeline-content">
              <span className="timeline-time">{item.time}</span>
              <p className="timeline-title">{item.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
