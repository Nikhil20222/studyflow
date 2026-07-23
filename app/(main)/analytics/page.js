"use client";

import { useState, useEffect } from "react";
import { Clock, CheckCircle2, Target, Trophy, NotebookPen, Flame } from "lucide-react";
import AnalyticsCard from "@/components/analytics/AnalyticsCard";
import ProgressCard from "@/components/analytics/ProgressCard";
import ActivitySummary from "@/components/analytics/ActivitySummary";
import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";
import { loadData, STORAGE_KEYS } from "@/lib/storage";
import "./analytics.css";

const subjects = ["Physics", "Chemistry", "Mathematics", "English", "Computer Science"];

const subjectColors = {
  Physics: "#3E8EED",
  Chemistry: "#2FBF71",
  Mathematics: "#E11D2E",
  English: "#E0A72A",
  "Computer Science": "#9B59F6",
};

const weeklyActivity = [
  { label: "Mon", value: 3 },
  { label: "Tue", value: 4.5 },
  { label: "Wed", value: 2 },
  { label: "Thu", value: 5 },
  { label: "Fri", value: 3.5 },
  { label: "Sat", value: 6 },
  { label: "Sun", value: 3.5 },
];

const fallbackTasks = [
  { subject: "Physics", status: "Completed", duration: "1.5 hrs" },
  { subject: "Physics", status: "Pending", duration: "40 mins" },
  { subject: "Chemistry", status: "Completed", duration: "1 hr" },
  { subject: "Chemistry", status: "Pending", duration: "1 hr" },
  { subject: "Mathematics", status: "Completed", duration: "45 mins" },
  { subject: "Computer Science", status: "Pending", duration: "1 hr" },
  { subject: "English", status: "Cancelled", duration: "30 mins" },
];

const fallbackNotesCount = 9;
const fallbackGoals = [
  { completed: false },
  { completed: false },
  { completed: false },
  { completed: true },
  { completed: true },
];
const fallbackProgress = { currentStreak: 18, longestStreak: 32 };

function parseDurationToHours(duration) {
  if (!duration) return 0;
  const text = duration.toLowerCase();
  const hoursMatch = text.match(/([\d.]+)\s*h/);
  const minsMatch = text.match(/([\d.]+)\s*m/);
  let hours = 0;
  if (hoursMatch) hours += parseFloat(hoursMatch[1]);
  if (minsMatch) hours += parseFloat(minsMatch[1]) / 60;
  return hours;
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const tasks = loadData(STORAGE_KEYS.TASKS, []);
    const notes = loadData(STORAGE_KEYS.NOTES, []);
    const goals = loadData(STORAGE_KEYS.GOALS, []);
    const progress = loadData(STORAGE_KEYS.PROGRESS, {});

    const taskData = tasks.length > 0 ? tasks : fallbackTasks;
    const notesCount = notes.length > 0 ? notes.length : fallbackNotesCount;
    const goalData = goals.length > 0 ? goals : fallbackGoals;
    const streakData = progress.currentStreak !== undefined ? progress : fallbackProgress;

    const completedTasks = taskData.filter((t) => t.status === "Completed");
    const totalHours = completedTasks.reduce(
      (sum, t) => sum + parseDurationToHours(t.duration),
      0
    );

    const activeGoals = goalData.filter((g) => !g.completed).length;
    const completedGoals = goalData.filter((g) => g.completed).length;

    const subjectProgress = subjects.map((subject) => {
      const subjectTasks = taskData.filter((t) => t.subject === subject);
      const done = subjectTasks.filter((t) => t.status === "Completed").length;
      const percent = subjectTasks.length > 0 ? Math.round((done / subjectTasks.length) * 100) : 0;
      return { subject, percent };
    });

    setStats({
      totalHours: +totalHours.toFixed(1),
      completedTasksCount: completedTasks.length,
      activeGoals,
      completedGoals,
      notesCount,
      currentStreak: streakData.currentStreak || 0,
      subjectProgress,
    });

    setLoading(false);
  }, []);

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1 className="analytics-title">Analytics</h1>
        <p className="analytics-subtitle">A snapshot of your study habits and progress.</p>
      </div>

      {loading || !stats ? (
        <div className="analytics-skeleton-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height="90px" radius="16px" />
          ))}
        </div>
      ) : (
        <>
          <div className="analytics-kpi-grid">
            <AnalyticsCard icon={Clock} label="Total Study Hours" value={stats.totalHours} suffix="h" />
            <AnalyticsCard icon={CheckCircle2} label="Completed Tasks" value={stats.completedTasksCount} />
            <AnalyticsCard icon={Target} label="Active Goals" value={stats.activeGoals} />
            <AnalyticsCard icon={Trophy} label="Completed Goals" value={stats.completedGoals} />
            <AnalyticsCard icon={NotebookPen} label="Notes Count" value={stats.notesCount} />
            <AnalyticsCard icon={Flame} label="Study Streak" value={stats.currentStreak} suffix=" days" />
          </div>

          <div className="analytics-main-row">
            <Card title="Weekly Activity" action="Hours studied">
              <ActivitySummary data={weeklyActivity} />
            </Card>

            <Card title="Subject-wise Progress">
              {stats.subjectProgress.map((item) => (
                <ProgressCard
                  key={item.subject}
                  label={item.subject}
                  percent={item.percent}
                  color={subjectColors[item.subject]}
                />
              ))}
            </Card>
          </div>

          <Card title="Monthly Summary" action="This month">
            <div className="analytics-summary-row">
              <div className="analytics-summary-item">
                <span className="analytics-summary-value">{stats.totalHours}h</span>
                <span className="analytics-summary-label">Hours Logged</span>
              </div>
              <div className="analytics-summary-item">
                <span className="analytics-summary-value">{stats.completedTasksCount}</span>
                <span className="analytics-summary-label">Tasks Completed</span>
              </div>
              <div className="analytics-summary-item">
                <span className="analytics-summary-value">{stats.completedGoals}</span>
                <span className="analytics-summary-label">Goals Achieved</span>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
