import "./ActivitySummary.css";

export default function ActivitySummary({ data }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="activity-chart">
      {data.map(({ label, value }) => (
        <div key={label} className="activity-column">
          <div className="activity-bar-track">
            <div
              className="activity-bar"
              style={{ height: `${(value / max) * 100}%` }}
            />
          </div>
          <span className="activity-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
