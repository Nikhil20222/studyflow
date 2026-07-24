import "./InsightCard.css";

export default function InsightCard({ label, value }) {
  return (
    <div className="insight-tile">
      <span className="insight-tile-value">{value}</span>
      <span className="insight-tile-label">{label}</span>
    </div>
  );
}
