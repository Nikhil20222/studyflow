"use client";

import { useState, useEffect } from "react";
import CalendarNav from "@/components/calendar/CalendarNav";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import DayDetailsPanel from "@/components/calendar/DayDetailsPanel";
import WeeklyPlanner from "@/components/calendar/WeeklyPlanner";
import StudyTimeline from "@/components/calendar/StudyTimeline";
import UpcomingPanel from "@/components/calendar/UpcomingPanel";
import WebBackground from "@/components/ui/WebBackground";
import Skeleton from "@/components/ui/Skeleton";
import Card from "@/components/ui/Card";
import "./calendar.css";

const today = new Date();
const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
const clampDay = (day) => Math.max(1, Math.min(daysInMonth, day));
const relativeDay = (offset) => clampDay(today.getDate() + offset);

const monthData = {
  [relativeDay(-3)]: {
    sessions: [{ subject: "Physics", title: "Mechanics revision", time: "7:00 - 8:00 AM" }],
    tasks: [{ subject: "Physics", title: "Solve numericals set 2", done: true }],
    completed: true,
  },
  [relativeDay(-1)]: {
    sessions: [{ subject: "Chemistry", title: "Organic reactions", time: "6:00 - 7:00 PM" }],
    tasks: [{ subject: "Chemistry", title: "Revise named reactions", done: true }],
    completed: true,
  },
  [relativeDay(0)]: {
    sessions: [
      { subject: "Physics", title: "Rotational Dynamics", time: "7:00 - 8:30 AM" },
      { subject: "Computer Science", title: "Data structures practice", time: "6:00 - 7:30 PM" },
    ],
    tasks: [
      { subject: "Chemistry", title: "Submit lab report", done: false },
      { subject: "Mathematics", title: "Integration practice set", done: true },
    ],
    exams: [{ title: "Chemistry Unit Test", time: "8:00 PM" }],
  },
  [relativeDay(2)]: {
    tasks: [{ subject: "Computer Science", title: "Assignment submission", done: false }],
    assignments: [{ subject: "Computer Science", title: "Sorting algorithms writeup" }],
  },
  [relativeDay(5)]: {
    sessions: [{ subject: "English", title: "Essay writing practice", time: "5:00 - 6:00 PM" }],
    assignments: [{ subject: "English", title: "Essay draft submission" }],
  },
  [relativeDay(9)]: {
    exams: [{ title: "JEE Mains Mock 4", time: "9:00 AM" }],
    sessions: [{ subject: "Full Syllabus", title: "Mock test prep", time: "4:00 - 6:00 PM" }],
  },
};

export default function CalendarPage() {
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [view, setView] = useState("month");
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const isCurrentMonth =
    viewDate.getMonth() === today.getMonth() && viewDate.getFullYear() === today.getFullYear();
  const activeMonthData = isCurrentMonth ? monthData : {};
  const selectedDayData = isCurrentMonth ? activeMonthData[selectedDay] || {} : {};

  function goPrev() {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedDay(null);
  }

  function goNext() {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDay(null);
  }

  function goToday() {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDay(today.getDate());
  }

  return (
    <div className="calendar-page">
      <WebBackground />

      <div className="calendar-page-content">
        <div className="calendar-page-header">
          <h1 className="calendar-page-title">Calendar</h1>
          <p className="calendar-page-subtitle">
            Your study sessions, tasks, exams and deadlines in one place.
          </p>
        </div>

        <CalendarNav
          viewDate={viewDate}
          onPrev={goPrev}
          onNext={goNext}
          onToday={goToday}
          view={view}
          onViewChange={setView}
        />

        {loading ? (
          <div className="calendar-skeleton-row">
            <Skeleton height="420px" radius="16px" />
            <Skeleton height="420px" radius="16px" />
          </div>
        ) : (
          <div className="calendar-main-row">
            <div className="calendar-main-column">
              {view === "month" ? (
                <CalendarGrid
                  viewDate={viewDate}
                  monthData={activeMonthData}
                  today={today}
                  selectedDay={selectedDay}
                  onSelectDay={setSelectedDay}
                />
              ) : (
                <WeeklyPlanner />
              )}
            </div>

            <div className="calendar-side-column">
              <DayDetailsPanel
                viewDate={viewDate}
                selectedDay={selectedDay}
                dayData={selectedDayData}
              />
            </div>
          </div>
        )}

        <div className="calendar-section">
          <Card title="Today's Study Timeline">
            <StudyTimeline />
          </Card>
        </div>

        <div className="calendar-section">
          <UpcomingPanel />
        </div>
      </div>
    </div>
  );
}
