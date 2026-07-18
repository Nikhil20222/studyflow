"use client";

import "./CalendarGrid.css";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function buildMonthCells(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const totalDays = new Date(year, month + 1, 0).getDate();

  // convert Sunday-first getDay() to Monday-first index
  const leadingBlanks = (firstDay.getDay() + 6) % 7;

  const cells = [];
  for (let i = 0; i < leadingBlanks; i++) cells.push(null);
  for (let day = 1; day <= totalDays; day++) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);

  return cells;
}

export default function CalendarGrid({ viewDate, monthData, today, selectedDay, onSelectDay }) {
  const cells = buildMonthCells(viewDate);
  const isCurrentMonth =
    viewDate.getMonth() === today.getMonth() && viewDate.getFullYear() === today.getFullYear();

  return (
    <div className="calendar-grid-wrap">
      <div className="calendar-weekdays">
        {weekDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {cells.map((day, index) => {
          if (!day) return <div key={index} className="calendar-cell empty" />;

          const data = monthData[day] || {};
          const isToday = isCurrentMonth && day === today.getDate();
          const isSelected = selectedDay === day;
          const hasExam = data.exams && data.exams.length > 0;
          const isBusy = (data.sessions?.length || 0) + (data.tasks?.length || 0) >= 3;
          const isCompleted = data.completed;

          let cellClass = "calendar-cell";
          if (isToday) cellClass += " today";
          if (isSelected) cellClass += " selected";
          if (isBusy) cellClass += " busy";
          if (isCompleted) cellClass += " completed";

          return (
            <button
              key={index}
              className={cellClass}
              style={{ animationDelay: `${index * 12}ms` }}
              onClick={() => onSelectDay(day)}
            >
              <span className="cell-date">{day}</span>

              <div className="cell-dots">
                {data.sessions?.length > 0 && <span className="cell-dot session" />}
                {data.tasks?.length > 0 && <span className="cell-dot task" />}
                {hasExam && <span className="cell-dot exam" />}
                {data.assignments?.length > 0 && <span className="cell-dot assignment" />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="calendar-legend">
        <span><i className="cell-dot session" /> Study Session</span>
        <span><i className="cell-dot task" /> Task</span>
        <span><i className="cell-dot exam" /> Exam</span>
        <span><i className="cell-dot assignment" /> Assignment</span>
      </div>
    </div>
  );
}
