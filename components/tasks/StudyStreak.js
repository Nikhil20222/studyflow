import { Flame, Trophy, CalendarCheck } from "lucide-react";
import "./StudyStreak.css";

export default function StudyStreak() {
  const currentStreak = 18;
  const longestStreak = 32;
  const weeklyGoal = 5;
  const weeklyDone = 5;

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

      <p className="streak-message">
        You're on fire! 3 more days to beat your record.
      </p>
    </div>
  );
}
