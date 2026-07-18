import { ChevronLeft, ChevronRight } from "lucide-react";
import "./CalendarNav.css";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function CalendarNav({
  viewDate,
  onPrev,
  onNext,
  onToday,
  view,
  onViewChange,
}) {
  const label = `${monthNames[viewDate.getMonth()]} ${viewDate.getFullYear()}`;

  return (
    <div className="calendar-nav">
      <div className="calendar-nav-left">
        <button className="calendar-nav-arrow ripple" onClick={onPrev}>
          <ChevronLeft size={18} />
        </button>
        <h2 className="calendar-nav-label">{label}</h2>
        <button className="calendar-nav-arrow ripple" onClick={onNext}>
          <ChevronRight size={18} />
        </button>
        <button className="calendar-nav-today ripple" onClick={onToday}>
          Today
        </button>
      </div>

      <div className="calendar-nav-toggle">
        <button
          className={view === "month" ? "toggle-tab active" : "toggle-tab"}
          onClick={() => onViewChange("month")}
        >
          Month
        </button>
        <button
          className={view === "week" ? "toggle-tab active" : "toggle-tab"}
          onClick={() => onViewChange("week")}
        >
          Week
        </button>
        <span className={view === "week" ? "toggle-underline week" : "toggle-underline"} />
      </div>
    </div>
  );
}
