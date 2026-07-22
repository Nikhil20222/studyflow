"use client";

import { useState } from "react";
import { Plus, Target } from "lucide-react";
import GoalCard from "@/components/goals/GoalCard";
import GoalForm from "@/components/goals/GoalForm";
import EmptyState from "@/components/ui/EmptyState";
import Card from "@/components/ui/Card";
import usePersistentState from "@/hooks/usePersistentState";
import { STORAGE_KEYS } from "@/lib/storage";
import "./goals.css";

const initialGoals = [
  {
    id: 1,
    title: "Finish Organic Chemistry syllabus",
    subject: "Chemistry",
    deadline: "15 Aug 2026",
    progress: 65,
    completed: false,
  },
  {
    id: 2,
    title: "Complete 10 JEE mock tests",
    subject: "Physics",
    deadline: "30 Aug 2026",
    progress: 40,
    completed: false,
  },
  {
    id: 3,
    title: "Master Integration & Differentiation",
    subject: "Mathematics",
    deadline: "10 Aug 2026",
    progress: 100,
    completed: true,
  },
  {
    id: 4,
    title: "Read 5 English comprehension passages weekly",
    subject: "English",
    deadline: "Ongoing",
    progress: 20,
    completed: false,
  },
  {
    id: 5,
    title: "Build a mini project using Data Structures",
    subject: "Computer Science",
    deadline: "5 Sep 2026",
    progress: 100,
    completed: true,
  },
];

const filters = ["All", "Active", "Completed"];

export default function GoalsPage() {
  const [goals, setGoals] = usePersistentState(STORAGE_KEYS.GOALS, initialGoals);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  function openCreate() {
    setEditingGoal(null);
    setShowForm(true);
  }

  function openEdit(goal) {
    setEditingGoal(goal);
    setShowForm(true);
  }

  function handleSave(data) {
    if (editingGoal) {
      setGoals((prev) =>
        prev.map((g) => (g.id === editingGoal.id ? { ...g, ...data } : g))
      );
    } else {
      setGoals((prev) => [{ id: Date.now(), ...data }, ...prev]);
    }
  }

  function handleDelete(id) {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }

  function toggleComplete(id) {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const nowCompleted = !g.completed;
        return { ...g, completed: nowCompleted, progress: nowCompleted ? 100 : g.progress };
      })
    );
  }

  const activeCount = goals.filter((g) => !g.completed).length;
  const completedCount = goals.filter((g) => g.completed).length;
  const completionRate = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

  const filteredGoals = goals.filter((g) => {
    if (activeFilter === "Active") return !g.completed;
    if (activeFilter === "Completed") return g.completed;
    return true;
  });

  return (
    <div className="goals-page">
      <div className="goals-header">
        <div>
          <h1 className="goals-title">Goals</h1>
          <p className="goals-subtitle">Set targets and track your progress toward them.</p>
        </div>
        <button className="goals-add-button" onClick={openCreate}>
          <Plus size={16} />
          New Goal
        </button>
      </div>

      <div className="goals-stats">
        <Card className="goals-stat-card">
          <span className="goals-stat-value">{activeCount}</span>
          <span className="goals-stat-label">Active Goals</span>
        </Card>
        <Card className="goals-stat-card">
          <span className="goals-stat-value">{completedCount}</span>
          <span className="goals-stat-label">Completed Goals</span>
        </Card>
        <Card className="goals-stat-card">
          <span className="goals-stat-value">{completionRate}%</span>
          <span className="goals-stat-label">Completion Rate</span>
        </Card>
      </div>

      <div className="goals-filters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={activeFilter === filter ? "goal-filter-chip active" : "goal-filter-chip"}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredGoals.length === 0 ? (
        <EmptyState
          icon={Target}
          title="No goals here yet"
          subtitle="Create a goal to start tracking your progress."
        />
      ) : (
        <div className="goals-grid">
          {filteredGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={openEdit}
              onDelete={handleDelete}
              onToggleComplete={toggleComplete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <GoalForm goal={editingGoal} onClose={() => setShowForm(false)} onSave={handleSave} />
      )}
    </div>
  );
}
