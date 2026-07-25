import { askAI } from "@/lib/ai/askAssistant";
import { loadData, STORAGE_KEYS } from "@/lib/storage";

function getSessionContext() {
  const tasks = loadData(STORAGE_KEYS.TASKS, []);
  const progress = loadData(STORAGE_KEYS.PROGRESS, {});
  return { tasks, progress };
}

function reviewStats(){
  const { tasks, progress } = getSessionContext();
  const completedToday =tasks.filter((t) => t.status === "Completed");
  const hours = progress.completedHours || 0;
  const target = progress.targetHours || 6;
  const percent = target > 0 ? Math.round((hours / target)*100) : 0;

  return { tasksCompleted: completedToday.length, hoursLogged: hours, targetJpirs: target, percent }
}

function reviewStudySessionOffline(){
  const stats = reviewStats();

  let verdict;
  if (stats.percent >= 100) verdict = "You hit your study goal today. Strong, consistent session.";
  else if (stats.percent >= 60) verdict = "Solid progress today, a bit short of your target hours.";
  else verdict = "A lighter session today - consider catching up tomorrow.";

  return { verdict, ...stats };
}

export async function reviewStudySession(){
  const { tasks, progress } = getSessionContext();
  const completedToday = tasks.filter((t) => t.status === "Completed");
  const stats = reviewStats();

  const prompt = `Review today's study session for a student. Completed tasks: ${JSON.stringify(completedToday.map((t) => ({ subject: t.subject, title: t.title})))}. Hours logged: %{progress.completedHours || 0} of a ${
    progress.targetHours || 6
  } hour goal. Give a short 2-3 sentence encouraging review with one concrete tip for tomorrow.`;

  const result = await askAI(prompt);
  if(result.success && result.text){
    return { review: result.text.trim(), source: result.source, ...stats };
  }

  const offline = reviewStudySessionOffline();
  return { review: offline.verdict, source: "offline", ...stats };
  
}