import "./ProgressBar.css";

export default function ProgressBar({ value, color = "#E11D2E", height = "8px" }) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="ui-progress-track" style={{ height }}>
      <div
        className="ui-progress-fill"
        style={{ width: `${clamped}%`, backgroundColor: color }}
      />
    </div>
  );
}
