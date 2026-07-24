import ProgressBar from "@/components/ui/ProgressBar";
import "./WeakSubjectCard.css";

const subjectColors = {
  Physics: "#3E8EED",
  Chemistry: "#2FBF71",
  Mathematics: "#E11D2E",
  English: "#E0A72A",
  "Computer Science": "#9B59F6",
};

export default function WeakSubjectCard({ subject, percent, pending }) {
  const color = subjectColors[subject] || "#8A8A93";

  return (
    <div className="weak-subject-row">
      <div className="weak-subject-labels">
        <span className="weak-subject-name" style={{ color }}>
          {subject}
        </span>
        <span className="weak-subject-pending">{pending} pending</span>
      </div>
      <ProgressBar value={percent} color={color} />
      <span className="weak-subject-percent">{percent}% complete</span>
    </div>
  );
}
