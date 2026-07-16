import Card from "@/components/ui/Card";
import "./WeeklyProgress.css";

const subjects = [
  { name: "Physics", progress: 62 },
  { name: "Chemistry", progress: 48 },
  { name: "Mathematics", progress: 74 },
  { name: "Biology", progress: 55 },
];

export default function WeeklyProgress() {
  return (
    <Card title="Weekly Progress" action="By subject">
      <div className="progress-list">
        {subjects.map((subject) => (
          <div key={subject.name} className="progress-item">
            <div className="progress-labels">
              <span className="progress-name">{subject.name}</span>
              <span className="progress-percent">{subject.progress}%</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${subject.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
