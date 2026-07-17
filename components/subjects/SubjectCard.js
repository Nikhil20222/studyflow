import "./SubjectCard.css";

export default function SubjectCard({ subject }) {
  const Icon = subject.icon;

  return (
    <div className="subject-card">
      <div className="subject-top">
        <span className="subject-icon" style={{ backgroundColor: subject.color }}>
          <Icon size={20} />
        </span>
        <div>
          <p className="subject-name">{subject.name}</p>
          <span className="subject-chapters">{subject.chapters} chapters</span>
        </div>
      </div>

      <div className="subject-progress-labels">
        <span>Progress</span>
        <span>{subject.progress}%</span>
      </div>
      <div className="subject-progress-track">
        <div
          className="subject-progress-fill"
          style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}
        />
      </div>

      <div className="subject-stats">
        <div className="subject-stat">
          <span className="subject-stat-value">{subject.studyHours}h</span>
          <span className="subject-stat-label">Study Hours</span>
        </div>
        <div className="subject-stat">
          <span className="subject-stat-value">{subject.pendingTasks}</span>
          <span className="subject-stat-label">Pending Tasks</span>
        </div>
        <div className="subject-stat">
          <span className="subject-stat-value">{subject.progress}%</span>
          <span className="subject-stat-label">Completion</span>
        </div>
      </div>
    </div>
  );
}
