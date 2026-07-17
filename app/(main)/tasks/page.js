"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import TodaysGoal from "@/components/tasks/TodaysGoal";
import StudyStreak from "@/components/tasks/StudyStreak";
import DailyPlanner from "@/components/tasks/DailyPlanner";
import TaskItem from "@/components/tasks/TaskItem";
import TaskCreateModal from "@/components/tasks/TaskCreateModal";
import UpcomingTasks from "@/components/tasks/UpcomingTasks";
import "./tasks.css";

const initialTasks = [
  {
    id: 1,
    subject: "Physics",
    title: "Complete rotational dynamics numericals",
    duration: "1.5 hrs",
    priority: "High",
    status: "In Progress",
    deadline: "Today, 6:00 PM",
    difficulty: "Hard",
    estimatedTime: "2 hrs",
  },
  {
    id: 2,
    subject: "Chemistry",
    title: "Revise Organic Chemistry — Named Reactions",
    duration: "1 hr",
    priority: "Medium",
    status: "Pending",
    deadline: "Today, 8:00 PM",
    difficulty: "Medium",
    estimatedTime: "1.5 hrs",
  },
  {
    id: 3,
    subject: "Mathematics",
    title: "Solve Integration practice set 4",
    duration: "45 mins",
    priority: "High",
    status: "Completed",
    deadline: "Today, 2:00 PM",
    difficulty: "Medium",
    estimatedTime: "1 hr",
  },
  {
    id: 4,
    subject: "Computer Science",
    title: "Implement merge sort and analyze complexity",
    duration: "1 hr",
    priority: "Medium",
    status: "Pending",
    deadline: "Tomorrow, 11:00 AM",
    difficulty: "Medium",
    estimatedTime: "1.5 hrs",
  },
  {
    id: 5,
    subject: "English",
    title: "Prose comprehension practice",
    duration: "30 mins",
    priority: "Low",
    status: "Cancelled",
    deadline: "Yesterday",
    difficulty: "Easy",
    estimatedTime: "45 mins",
  },
  {
    id: 6,
    subject: "Physics",
    title: "Watch lecture on Electromagnetic Induction",
    duration: "40 mins",
    priority: "Low",
    status: "Pending",
    deadline: "Tomorrow, 5:00 PM",
    difficulty: "Easy",
    estimatedTime: "40 mins",
  },
];

const filters = ["All", "Pending", "In Progress", "Completed", "Cancelled"];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showCreate, setShowCreate] = useState(false);

  function handleStatusChange(id, newStatus) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
    );
  }

  function handleCreate(newTask) {
    setTasks((prev) => [newTask, ...prev]);
  }

  const visibleTasks =
    activeFilter === "All" ? tasks : tasks.filter((task) => task.status === activeFilter);

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <div>
          <h1 className="tasks-title">Tasks</h1>
          <p className="tasks-subtitle">Plan, track and complete your study sessions.</p>
        </div>
        <button className="tasks-add-button" onClick={() => setShowCreate(true)}>
          <Plus size={16} />
          Add Task
        </button>
      </div>

      <div className="tasks-top-row">
        <TodaysGoal />
        <StudyStreak />
      </div>

      <DailyPlanner />

      <div className="tasks-content">
        <div className="tasks-main">
          <div className="tasks-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? "filter-chip active" : "filter-chip"}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="tasks-list">
            {visibleTasks.map((task) => (
              <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} />
            ))}
            {visibleTasks.length === 0 && (
              <p className="tasks-empty">No tasks in this category yet.</p>
            )}
          </div>
        </div>

        <div className="tasks-side">
          <UpcomingTasks />
        </div>
      </div>

      {showCreate && (
        <TaskCreateModal onClose={() => setShowCreate(false)} onCreate={handleCreate} />
      )}
    </div>
  );
}
