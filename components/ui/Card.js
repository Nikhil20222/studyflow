import "./Card.css";

export default function Card({ title, action, children, className = "" }) {
  return (
    <div className={`card ${className}`.trim()}>
      {(title || action) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {action && <div className="card-action">{action}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
}
