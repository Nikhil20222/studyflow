import { askAI } from "@/lib/ai/askAssistant";
import { tryParseJSON } from "@/lib/ai/parseJSON";
import { loadData, STORAGE_KEYS } from "@/lib/storage";

function getRevisionContext() {
  const tasks = loadData(STORAGE_KEYS.TASKS, []);
  const goals = loadData(STORAGE_KEYS.GOALS, []);
  return { tasks, goals };
}

function generateRevisionPlanOffline() {
  const { tasks, goals } = getRevisionContext();

  const pendingTasks = tasks.filter((t) => t.status !== "Completed" && t.status !== "Cancelled");
  const activeGoals = goals.filter((g) => !g.completed);

  const bySubject = {};
  pendingTasks.forEach((task) => {
    bySubject[task.subject] = (bySubject[task.subject] || 0) + 1;
  });

  const prioritySubjects = Object.entries(bySubject)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([subject]) => subject);

  const plan = prioritySubjects.map((subject, index) => ({
    day: `Day ${index + 1}`,
    subject,
    focus: `Revise pending topics and redo one practice set in ${subject}.`,
  }));

  activeGoals.slice(0, 2).forEach((goal, index) => {
    plan.push({
      day: `Day ${prioritySubjects.length + index + 1}`,
      subject: goal.subject,
      focus: `Push "${goal.title}" forward — deadline: ${goal.deadline}.`,
    });
  });

  if (plan.length === 0) {
    plan.push({ day: "Day 1", subject: "General", focus: "You're on track — use today for light revision." });
  }

  return plan;
}

export async function generateRevisionPlan() {
  const { tasks, goals } = getRevisionContext();

  const pending = tasks
    .filter((t) => t.status !== "Completed")
    .map((t) => ({ subject: t.subject, title: t.title, deadline: t.deadline }));
  const active = goals
    .filter((g) => !g.completed)
    .map((g) => ({ subject: g.subject, title: g.title, deadline: g.deadline }));

  const prompt = `Create a short 3-5 day revision plan for a student. Their pending tasks: ${JSON.stringify(
    pending
  )}. Their active goals (deadlines act as exam dates): ${JSON.stringify(
    active
  )}. Reply ONLY with a JSON array like [{"day":"Day 1","subject":"...","focus":"..."}] and nothing else.`;

  const result = await askAI(prompt);
  if (result.success && result.text) {
    const parsed = tryParseJSON(result.text);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return { plan: parsed, source: result.source };
    }
  }

  return { plan: generateRevisionPlanOffline(), source: "offline" };
}
