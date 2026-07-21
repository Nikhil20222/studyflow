import { Flame, Trophy, CalendarCheck } from "lucide-react";
import "./StudyStreak.css";

export default function StudyStreak({
  currentStreak = 0,
  longestStreak = 0,
  weeklyGoal = 5,
  weeklyDone = 0,
}) {
  const daysToRecord = Math.max(0, longestStreak - currentStreak);
  const message =
    daysToRecord === 0
      ? "You're at your personal best. Keep it going!"
      : `You're on fire! ${daysToRecord} more day${daysToRecord === 1 ? "" : "s"} to beat your record.`;

  return (
    <div className="streak-card">
      <div className="streak-top">
        <span className="streak-flame">
          <Flame size={20} />
        </span>
        <span className="streak-label">Study Streak</span>
      </div>

      <p className="streak-value">{currentStreak} days</p>

      <div className="streak-stats">
        <div className="streak-stat">
          <Trophy size={14} />
          <span>Longest: {longestStreak} days</span>
        </div>
        <div className="streak-stat">
          <CalendarCheck size={14} />
          <span>Weekly goal: {weeklyDone}/{weeklyGoal} days</span>
        </div>
      </div>

      <p className="streak-message">{message}</p>
    </div>
  );
}
