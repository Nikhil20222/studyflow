import { loadData, STORAGE_KEYS } from "@/lib/storage";

const fallbackTasks = [
  { subject: "Physics", status: "Completed", priority: "High", duration: "1.5 hrs", deadline: "Today, 6:00 PM" },
  { subject: "Physics", status: "Pending", priority: "Low", duration: "40 mins", deadline: "Tomorrow, 5:00 PM" },
  { subject: "Chemistry", status: "Completed", priority: "Medium", duration: "1 hr", deadline: "Today, 8:00 PM" },
  { subject: "Chemistry", status: "Pending", priority: "Medium", duration: "1 hr", deadline: "Today, 2:00 PM" },
  { subject: "Mathematics", status: "Completed", priority: "High", duration: "45 mins", deadline: "Today, 2:00 PM" },
  { subject: "Computer Science", status: "Pending", priority: "Medium", duration: "1 hr", deadline: "Tomorrow, 11:00 AM" },
  { subject: "English", status: "Cancelled", priority: "Low", duration: "30 mins", deadline: "Yesterday" },
];

const fallbackNotes = [
  { subject: "Physics", title: "Newton's Laws of Motion", updatedAt: "2 hours ago" },
  { subject: "Chemistry", title: "Periodic Table Trends", updatedAt: "Yesterday" },
  { subject: "Mathematics", title: "Integration Formulas Cheat Sheet", updatedAt: "5 hours ago" },
];

const fallbackGoals = [
  { subject: "Chemistry", completed: false },
  { subject: "Physics", completed: false },
  { subject: "English", completed: false },
  { subject: "Mathematics", completed: true },
];

const fallbackProgress = {
  targetHours: 6,
  completedHours: 3.5,
  currentStreak: 18,
  longestStreak: 32,
};

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

function getContext() {
  const tasks = loadData(STORAGE_KEYS.TASKS, []);
  const notes = loadData(STORAGE_KEYS.NOTES, []);
  const goals = loadData(STORAGE_KEYS.GOALS, []);
  const progress = loadData(STORAGE_KEYS.PROGRESS, {});

  return {
    tasks: tasks.length > 0 ? tasks : fallbackTasks,
    notes: notes.length > 0 ? notes : fallbackNotes,
    goals: goals.length > 0 ? goals : fallbackGoals,
    progress: progress.currentStreak !== undefined ? progress : fallbackProgress,
  };
}

function bySubjectCompletion(tasks) {
  const bySubject = {};
  tasks.forEach((task) => {
    if (!bySubject[task.subject]) bySubject[task.subject] = { total: 0, completed: 0 };
    bySubject[task.subject].total += 1;
    if (task.status === "Completed") bySubject[task.subject].completed += 1;
  });

  return Object.entries(bySubject).map(([subject, data]) => ({
    subject,
    percent: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0,
    pending: data.total - data.completed,
  }));
}

export function getTodaysPlan() {
  const { tasks } = getContext();
  const order = { High: 0, Medium: 1, Low: 2 };

  const pending = tasks
    .filter((task) => task.status === "Pending" || task.status === "In Progress")
    .sort((a, b) => (order[a.priority] ?? 3) - (order[b.priority] ?? 3));

  return pending.slice(0, 4).map((task) => ({
    subject: task.subject,
    title: task.title || `${task.subject} study block`,
    reason: `${task.priority || "Medium"} priority`,
  }));
}

export function getWeeklyPlan() {
  const { tasks } = getContext();
  const activeSubjects = [
    ...new Set(
      tasks.filter((t) => t.status !== "Completed" && t.status !== "Cancelled").map((t) => t.subject)
    ),
  ];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days.map((day, index) => ({
    day,
    subject: activeSubjects[index % activeSubjects.length] || "Full Syllabus",
    focus: "Review pending tasks and revise weak areas",
  }));
}

export function getWeakSubjects() {
  const { tasks } = getContext();
  return bySubjectCompletion(tasks)
    .sort((a, b) => a.percent - b.percent)
    .slice(0, 3);
}

export function getStudySuggestions() {
  const { tasks, goals } = getContext();
  const suggestions = [];

  const weakest = bySubjectCompletion(tasks).sort((a, b) => a.percent - b.percent)[0];
  if (weakest) {
    suggestions.push(`Focus more time on ${weakest.subject} — it has the most pending tasks.`);
  }

  const dueToday = tasks.filter(
    (t) => t.status !== "Completed" && t.status !== "Cancelled" && t.deadline?.toLowerCase().includes("today")
  );
  if (dueToday.length > 0) {
    suggestions.push(
      `You have ${dueToday.length} task${dueToday.length > 1 ? "s" : ""} due today — tackle those first.`
    );
  }

  const activeGoals = goals.filter((g) => !g.completed);
  if (activeGoals.length > 0) {
    suggestions.push(
      `You have ${activeGoals.length} active goal${activeGoals.length > 1 ? "s" : ""} in progress. A little progress today keeps them on track.`
    );
  }

  if (suggestions.length === 0) {
    suggestions.push("You're all caught up. Consider getting ahead on upcoming chapters.");
  }

  return suggestions;
}

export function getRevisionSuggestions() {
  const { notes } = getContext();
  return notes.slice(0, 4).map((note) => ({
    subject: note.subject,
    title: note.title,
    note: `Last reviewed ${note.updatedAt || "a while ago"}`,
  }));
}

export function getProductivityInsights() {
  const { tasks, goals, progress } = getContext();
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const total = tasks.length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return [
    { label: "Task Completion Rate", value: `${completionRate}%` },
    { label: "Hours Logged Today", value: `${progress.completedHours || 0}h` },
    { label: "Goals In Progress", value: `${goals.filter((g) => !g.completed).length}` },
  ];
}

export function getMotivationMessage() {
  const { progress } = getContext();
  const streak = progress.currentStreak || 0;

  if (streak === 0) return "Every streak starts with a single day. Start yours today!";
  if (streak < 7) return `${streak}-day streak! Keep the momentum going.`;
  if (streak < 20) return `${streak} days strong. You're building a real habit.`;
  return `${streak} days! That's serious consistency — don't stop now.`;
}

export function getOfflineAnswer(prompt) {
  const text = prompt.toLowerCase();

  if (text.includes("plan") || text.includes("today")) {
    const plan = getTodaysPlan();
    if (plan.length === 0) return "You have no pending tasks for today. Great time to get ahead on revision.";
    return `Here's what to focus on today: ${plan.map((p) => `${p.title} (${p.subject})`).join(", ")}.`;
  }

  if (text.includes("weak") || text.includes("struggl")) {
    const weak = getWeakSubjects()[0];
    if (!weak) return "You're doing well across all subjects right now.";
    return `${weak.subject} could use more attention — you're at ${weak.percent}% completion there.`;
  }

  if (text.includes("motivat")) {
    return getMotivationMessage();
  }

  if (text.includes("streak")) {
    const { progress } = getContext();
    return `Your current streak is ${progress.currentStreak || 0} days, with a longest streak of ${
      progress.longestStreak || 0
    } days.`;
  }

  if (text.includes("goal")) {
    const { goals } = getContext();
    const active = goals.filter((g) => !g.completed).length;
    return `You have ${active} active goal${active === 1 ? "" : "s"} right now. Keep chipping away at them.`;
  }

  return getStudySuggestions()[0];
}
