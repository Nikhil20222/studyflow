import Card from "@/components/ui/Card";
import "./StudyHours.css";

const days = [
  { day: "Mon", hours: 3 },
  { day: "Tue", hours: 4.5 },
  { day: "Wed", hours: 2 },
  { day: "Thu", hours: 5 },
  { day: "Fri", hours: 3.5 },
  { day: "Sat", hours: 6 },
  { day: "Sun", hours: 3.5 },
];

const max = Math.max(...days.map((d) => d.hours));

export default function StudyHours() {
  return (
    <Card title="Study Hours" action="This week">
      <div className="hours-chart">
        {days.map(({ day, hours }) => (
          <div key={day} className="hours-column">
            <div className="hours-bar-track">
              <div
                className="hours-bar"
                style={{ height: `${(hours / max) * 100}%` }}
              />
            </div>
            <span className="hours-day">{day}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
