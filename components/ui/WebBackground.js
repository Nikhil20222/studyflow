import "./WebBackground.css";

export default function WebBackground() {
  return (
    <div className="web-background">
      <svg className="web-lines" viewBox="0 0 800 600" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="800" y2="600" />
        <line x1="800" y1="0" x2="0" y2="600" />
        <line x1="0" y1="150" x2="800" y2="150" />
        <line x1="0" y1="450" x2="800" y2="450" />
        <line x1="200" y1="0" x2="200" y2="600" />
        <line x1="600" y1="0" x2="600" y2="600" />
      </svg>

      <span className="web-particle particle-1" />
      <span className="web-particle particle-2" />
      <span className="web-particle particle-3" />
      <span className="web-particle particle-4" />
      <span className="web-particle particle-5" />
    </div>
  );
}
