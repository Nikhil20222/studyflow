import { Sunrise, Sun, Sunset, Moon } from "lucide-react";
import Card from "@/components/ui/Card";
import "./DailyPlanner.css";

const periods = [
  {
    name: "Morning",
    icon: Sunrise,
    time: "6:00 - 10:00 AM",
    sessions: [{ subject: "Physics", task: "Rotational Dynamics", time: "7:00 - 8:30 AM" }],
  },
  {
    name: "Afternoon",
    icon: Sun,
    time: "12:00 - 4:00 PM",
    sessions: [
      { subject: "Mathematics", task: "Integration practice set", time: "1:00 - 2:30 PM" },
      { subject: "Chemistry", task: "Organic reactions revision", time: "3:00 - 4:00 PM" },
    ],
  },
  {
    name: "Evening",
    icon: Sunset,
    time: "5:00 - 8:00 PM",
    sessions: [{ subject: "Computer Science", task: "Data structures practice", time: "6:00 - 7:30 PM" }],
  },
  {
    name: "Night",
    icon: Moon,
    time: "9:00 - 11:00 PM",
    sessions: [{ subject: "English", task: "Comprehension + revision", time: "9:30 - 10:15 PM" }],
  },
];

export default function DailyPlanner() {
  return (
    <Card title="Today's Plan" action="4 sessions">
      <div className="planner-grid">
        {periods.map(({ name, icon: Icon, time, sessions }) => (
          <div key={name} className="planner-period">
            <div className="planner-period-header">
              <Icon size={16} />
              <div>
                <p className="planner-period-name">{name}</p>
                <span className="planner-period-time">{time}</span>
              </div>
            </div>

            <div className="planner-sessions">
              {sessions.map((session) => (
                <div key={session.task} className="planner-session">
                  <span className="planner-session-subject">{session.subject}</span>
                  <p className="planner-session-task">{session.task}</p>
                  <span className="planner-session-time">{session.time}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
