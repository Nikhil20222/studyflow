import "./AnalyticsCard.css";

export default function AnalyticsCard({ icon: Icon, label, value, suffix = "" }) {
  return (
    <div className="analytics-card">
      <div className="analytics-card-top">
        <span className="analytics-card-label">{label}</span>
        {Icon && <Icon size={16} />}
      </div>
      <p className="analytics-card-value">
        {value}
        {suffix && <span className="analytics-card-suffix">{suffix}</span>}
      </p>
    </div>
  );
}
