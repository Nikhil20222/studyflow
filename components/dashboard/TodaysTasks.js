import Card from "@/components/ui/Card";
import "./TodaysTasks.css";

const tasks = [
  { title: "Complete Organic Chemistry Ch. 12", subject: "Chemistry", done: true },
  { title: "Solve 20 Mechanics problems", subject: "Physics", done: true },
  { title: "Revise Integration formulas", subject: "Maths", done: false },
  { title: "Read Modern Physics notes", subject: "Physics", done: false },
  { title: "Attempt mock test 4", subject: "Full Syllabus", done: false },
];

export default function TodaysTasks() {
  return (
    <Card title="Today's Tasks" action="5 tasks">
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.title} className={task.done ? "task-item done" : "task-item"}>
            <span className="task-checkbox" />
            <div className="task-info">
              <p className="task-title">{task.title}</p>
              <span className="task-subject">{task.subject}</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
