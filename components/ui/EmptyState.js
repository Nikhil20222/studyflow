import "./EmptyState.css";

export default function EmptyState({ icon: Icon, title, subtitle }) {
  return (
    <div className="empty-state">
      {Icon && (
        <span className="empty-state-icon">
          <Icon size={22} />
        </span>
      )}
      <p className="empty-state-title">{title}</p>
      {subtitle && <p className="empty-state-subtitle">{subtitle}</p>}
    </div>
  );
}
