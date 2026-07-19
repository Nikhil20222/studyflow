import { Clock3, CheckSquare, GraduationCap, FileText } from "lucide-react";
import "./DayDetailsPanel.css";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function DayDetailsPanel({ viewDate, selectedDay, dayData }) {
  const label = selectedDay
    ? `${selectedDay} ${monthNames[viewDate.getMonth()]}`
    : "Select a day";

  const sessions = dayData.sessions || [];
  const tasks = dayData.tasks || [];
  const exams = dayData.exams || [];
  const assignments = dayData.assignments || [];

  const totalItems = sessions.length + tasks.length + exams.length + assignments.length;
  const doneCount = tasks.filter((t) => t.done).length;
  const progress = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div className="day-panel">
      <div className="day-panel-header">
        <h3>{label}</h3>
        {tasks.length > 0 && (
          <div className="day-panel-progress">
            <div className="day-panel-track">
              <div className="day-panel-fill" style={{ width: `${progress}%` }} />
            </div>
            <span>{progress}% done</span>
          </div>
        )}
      </div>

      {totalItems === 0 ? (
        <p className="day-panel-empty">Nothing scheduled for this day.</p>
      ) : (
        <div className="day-panel-sections">
          {sessions.length > 0 && (
            <div className="day-panel-section">
              <p className="day-panel-section-title">
                <Clock3 size={14} /> Study Sessions
              </p>
              {sessions.map((s) => (
                <div key={s.title} className="day-panel-row">
                  <span className="day-panel-subject">{s.subject}</span>
                  <span>{s.title}</span>
                  <span className="day-panel-time">{s.time}</span>
                </div>
              ))}
            </div>
          )}

          {tasks.length > 0 && (
            <div className="day-panel-section">
              <p className="day-panel-section-title">
                <CheckSquare size={14} /> Tasks
              </p>
              {tasks.map((t) => (
                <div key={t.title} className={t.done ? "day-panel-row done" : "day-panel-row"}>
                  <span className="day-panel-subject">{t.subject}</span>
                  <span>{t.title}</span>
                </div>
              ))}
            </div>
          )}

          {exams.length > 0 && (
            <div className="day-panel-section">
              <p className="day-panel-section-title">
                <GraduationCap size={14} /> Exams
              </p>
              {exams.map((e) => (
                <div key={e.title} className="day-panel-row exam">
                  <span>{e.title}</span>
                  <span className="day-panel-time">{e.time}</span>
                </div>
              ))}
            </div>
          )}

          {assignments.length > 0 && (
            <div className="day-panel-section">
              <p className="day-panel-section-title">
                <FileText size={14} /> Assignments
              </p>
              {assignments.map((a) => (
                <div key={a.title} className="day-panel-row">
                  <span className="day-panel-subject">{a.subject}</span>
                  <span>{a.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
