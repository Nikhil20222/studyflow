import "./PlannerCard.css";

export default function PlannerCard({ subject, title, meta }) {
  return (
    <div className="planner-item-card">
      <span className="planner-item-subject">{subject}</span>
      <p className="planner-item-title">{title}</p>
      {meta && <span className="planner-item-meta">{meta}</span>}
    </div>
  );
}
