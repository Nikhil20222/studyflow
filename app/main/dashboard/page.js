import Greeting from "@/components/dashboard/Greeting";
import QuickStats from "@/components/dashboard/QuickStats";
import StudyHours from "@/components/dashboard/StudyHours";
import TodaysTasks from "@/components/dashboard/TodaysTasks";
import UpcomingExams from "@/components/dashboard/UpcomingExams";
import WeeklyProgress from "@/components/dashboard/WeeklyProgress";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import "./dashboard.css";

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <Greeting />
      <QuickStats />

      <div className="dashboard-grid">
        <div className="dashboard-column main">
          <StudyHours />
          <TodaysTasks />
          <WeeklyProgress />
        </div>

        <div className="dashboard-column side">
          <UpcomingExams />
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
