import Card from "@/components/ui/Card";
import "./UpcomingTasks.css";

const upcoming = [
  { subject: "Physics", title: "Submit lab report", deadline: "Tomorrow, 9:00 AM", priority: "High" },
  { subject: "Mathematics", title: "Chapter 8 practice test", deadline: "In 2 days", priority: "Medium" },
  { subject: "Computer Science", title: "Sorting algorithms assignment", deadline: "In 3 days", priority: "High" },
  { subject: "Chemistry", title: "Revise Periodic Table trends", deadline: "In 4 days", priority: "Low" },
];

export default function UpcomingTasks() {
  return (
    <Card title="Upcoming Tasks" action={`${upcoming.length} tasks`}>
      <ul className="upcoming-list">
        {upcoming.map((task) => (
          <li key={task.title} className="upcoming-item">
            <span className={`upcoming-dot ${task.priority.toLowerCase()}`} />
            <div className="upcoming-info">
              <p className="upcoming-title">{task.title}</p>
              <span className="upcoming-subject">{task.subject}</span>
            </div>
            <span className="upcoming-deadline">{task.deadline}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
