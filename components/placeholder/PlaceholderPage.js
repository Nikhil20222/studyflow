import "./PlaceholderPage.css";

export default function PlaceholderPage({ title }) {
  return (
    <div className="placeholder">
      <div className="placeholder-mark" />
      <h2 className="placeholder-title">{title}</h2>
      <p className="placeholder-text">This module will be implemented in upcoming phases.</p>
    </div>
  );
}
