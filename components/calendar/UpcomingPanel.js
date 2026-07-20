import { GraduationCap, AlarmClock, CalendarClock } from "lucide-react";
import "./UpcomingPanel.css";

const exams = [
  { title: "Chemistry Unit Test", date: "Today, 8:00 PM" },
  { title: "JEE Mains Mock 4", date: "In 12 days" },
  { title: "NEET Full Syllabus Test", date: "In 28 days" },
];

const deadlines = [
  { title: "Physics lab report", date: "Tomorrow, 9:00 AM" },
  { title: "CS assignment submission", date: "In 3 days" },
  { title: "English essay draft", date: "In 5 days" },
];

const events = [
  { title: "Study group — Organic Chemistry", date: "Today, 5:00 PM" },
  { title: "Doubt clearing session", date: "Tomorrow, 4:00 PM" },
  { title: "Mock test review", date: "In 2 days" },
];

const columns = [
  { title: "Upcoming Exams", icon: GraduationCap, items: exams, accent: "exam" },
  { title: "Upcoming Deadlines", icon: AlarmClock, items: deadlines, accent: "deadline" },
  { title: "Today's Events", icon: CalendarClock, items: events, accent: "event" },
];

export default function UpcomingPanel() {
  return (
    <div className="upcoming-panel">
      {columns.map(({ title, icon: Icon, items, accent }, colIndex) => (
        <div key={title} className="upcoming-column">
          <div className="upcoming-column-head">
            <Icon size={15} />
            <span>{title}</span>
          </div>

          <div className="upcoming-column-list">
            {items.map((item, index) => (
              <div
                key={item.title}
                className="upcoming-entry"
                style={{ animationDelay: `${(colIndex * items.length + index) * 60}ms` }}
              >
                <span className={`upcoming-marker ${accent}`} />
                <div>
                  <p className="upcoming-entry-title">{item.title}</p>
                  <span className="upcoming-entry-date">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
