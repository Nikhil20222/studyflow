import { Clock, Timer, CalendarDays } from "lucide-react";
import StatusBadge from "./StatusBadge";
import "./TaskItem.css";

const statusFlow = ["Pending", "In Progress", "Completed", "Cancelled"];

export default function TaskItem({ task, onStatusChange }) {
  function cycleStatus() {
    const currentIndex = statusFlow.indexOf(task.status);
    const nextStatus = statusFlow[(currentIndex + 1) % statusFlow.length];
    onStatusChange(task.id, nextStatus);
  }

  return (
    <div className="task-row">
      <div className="task-row-main">
        <div className="task-row-top">
          <span className="task-subject-chip">{task.subject}</span>
          <span className={`task-priority ${task.priority.toLowerCase()}`}>
            {task.priority} priority
          </span>
          <span className={`task-difficulty ${task.difficulty.toLowerCase()}`}>
            {task.difficulty}
          </span>
        </div>

        <p className="task-row-title">{task.title}</p>

        <div className="task-row-meta">
          <span>
            <Clock size={13} /> {task.duration}
          </span>
          <span>
            <Timer size={13} /> Est. {task.estimatedTime}
          </span>
          <span>
            <CalendarDays size={13} /> {task.deadline}
          </span>
        </div>
      </div>

      <StatusBadge status={task.status} onClick={cycleStatus} />
    </div>
  );
}
