import { Fragment } from "react";
import "./WeeklyPlanner.css";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const periods = ["Morning", "Afternoon", "Evening", "Night"];

const plan = {
  Mon: {
    Morning: { subject: "Physics", duration: "1.5h", goal: "Rotational dynamics", status: "Completed" },
    Evening: { subject: "Chemistry", duration: "1h", goal: "Named reactions", status: "Completed" },
  },
  Tue: {
    Afternoon: { subject: "Mathematics", duration: "1h", goal: "Integration set 4", status: "Completed" },
    Night: { subject: "English", duration: "45m", goal: "Comprehension", status: "Pending" },
  },
  Wed: {
    Morning: { subject: "Computer Science", duration: "1h", goal: "Merge sort", status: "In Progress" },
    Evening: { subject: "Physics", duration: "1h", goal: "EM Induction", status: "Pending" },
  },
  Thu: {
    Afternoon: { subject: "Chemistry", duration: "1.5h", goal: "Periodic trends", status: "Pending" },
  },
  Fri: {
    Morning: { subject: "Mathematics", duration: "1h", goal: "Differentiation", status: "Pending" },
    Night: { subject: "Computer Science", duration: "1h", goal: "Graph traversal", status: "Pending" },
  },
  Sat: {
    Morning: { subject: "Physics", duration: "2h", goal: "Mock test 4", status: "Pending" },
    Afternoon: { subject: "Chemistry", duration: "1h", goal: "Revision", status: "Pending" },
  },
  Sun: {
    Evening: { subject: "Full Syllabus", duration: "2h", goal: "Weekly mock test", status: "Pending" },
  },
};

const statusClass = {
  Completed: "session-status completed",
  "In Progress": "session-status in-progress",
  Pending: "session-status pending",
};

export default function WeeklyPlanner() {
  return (
    <div className="weekly-planner">
      <div className="weekly-grid">
        <div className="weekly-corner" />
        {days.map((day) => (
          <div key={day} className="weekly-day-head">
            {day}
          </div>
        ))}

        {periods.map((period, rowIndex) => (
          <Fragment key={period}>
            <div className="weekly-period-head">{period}</div>
            {days.map((day, colIndex) => {
              const session = plan[day]?.[period];
              return (
                <div
                  key={`${period}-${day}`}
                  className="weekly-cell"
                  style={{ animationDelay: `${(rowIndex * 7 + colIndex) * 20}ms` }}
                >
                  {session ? (
                    <div className="session-card">
                      <span className="session-subject">{session.subject}</span>
                      <p className="session-goal">{session.goal}</p>
                      <div className="session-footer">
                        <span className="session-duration">{session.duration}</span>
                        <span className={statusClass[session.status]}>{session.status}</span>
                      </div>
                    </div>
                  ) : (
                    <span className="weekly-cell-empty">—</span>
                  )}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
