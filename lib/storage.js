export const STORAGE_KEYS = {
  TASKS: "studyflow_tasks",
  NOTES: "studyflow_notes",
  CALENDAR: "studyflow_calendar",
  GOALS: "studyflow_goals",
  PROGRESS: "studyflow_progress",
  SETTINGS: "studyflow_settings",
  ONBOARDING: "studyflow_onboarding_seen",
};

export function loadData(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw);
    if (parsed === null || parsed === undefined) return fallback;

    return parsed;
  } catch (error) {
    console.warn(`StudyFlow: could not read "${key}" from storage, using default.`, error);
    return fallback;
  }
}

export function saveData(key, value) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`StudyFlow: could not save "${key}" to storage.`, error);
  }
}

export function removeData(key) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`StudyFlow: could not remove "${key}" from storage.`, error);
  }
}

export function exportAllData() {
  const data = {};

  Object.values(STORAGE_KEYS).forEach((key) => {
    if (key === STORAGE_KEYS.ONBOARDING) return;

    const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    if (!raw) return;

    try {
      data[key] = JSON.parse(raw);
    } catch (error) {
      console.warn(`StudyFlow: skipped corrupted entry "${key}" during export.`, error);
    }
  });

  return data;
}

export function importAllData(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { success: false, message: "That file doesn't look like a StudyFlow export." };
  }

  const validKeys = Object.values(STORAGE_KEYS);
  let importedCount = 0;

  try {
    Object.entries(data).forEach(([key, value]) => {
      if (validKeys.includes(key)) {
        saveData(key, value);
        importedCount += 1;
      }
    });

    if (importedCount === 0) {
      return { success: false, message: "No recognizable StudyFlow data found in this file." };
    }

    return { success: true };
  } catch (error) {
    console.warn("StudyFlow: import failed.", error);
    return { success: false, message: "Something went wrong while importing your data." };
  }
}

export function resetAllData() {
  Object.values(STORAGE_KEYS).forEach((key) => removeData(key));
}
