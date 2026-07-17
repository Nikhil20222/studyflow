import { Atom, FlaskConical, Sigma, Languages, Cpu } from "lucide-react";
import SubjectCard from "@/components/subjects/SubjectCard";
import "./subjects.css";

const subjects = [
  {
    name: "Physics",
    icon: Atom,
    color: "#3E8EED",
    progress: 62,
    studyHours: 34,
    pendingTasks: 4,
    chapters: 18,
  },
  {
    name: "Chemistry",
    icon: FlaskConical,
    color: "#2FBF71",
    progress: 48,
    studyHours: 27,
    pendingTasks: 6,
    chapters: 20,
  },
  {
    name: "Mathematics",
    icon: Sigma,
    color: "#E11D2E",
    progress: 74,
    studyHours: 41,
    pendingTasks: 2,
    chapters: 16,
  },
  {
    name: "English",
    icon: Languages,
    color: "#E0A72A",
    progress: 55,
    studyHours: 15,
    pendingTasks: 3,
    chapters: 10,
  },
  {
    name: "Computer Science",
    icon: Cpu,
    color: "#9B59F6",
    progress: 80,
    studyHours: 30,
    pendingTasks: 1,
    chapters: 14,
  },
];

export default function SubjectsPage() {
  return (
    <div className="subjects-page">
      <div className="subjects-header">
        <h1 className="subjects-title">Subjects</h1>
        <p className="subjects-subtitle">
          Track your progress and study time across every subject.
        </p>
      </div>

      <div className="subjects-grid">
        {subjects.map((subject) => (
          <SubjectCard key={subject.name} subject={subject} />
        ))}
      </div>
    </div>
  );
}
