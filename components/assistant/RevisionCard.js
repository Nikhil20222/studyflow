import "./RevisionCard.css";

export default function RevisionCard({ day, subject, focus}) {
  return (
    <div className="revision-card">
      <span className="revision-card-day">{day}</span>
      <span className="revision-card-subject">{subject}</span>
      <p className="revision-card-focus">{focus}</p>
    </div>
  );
}