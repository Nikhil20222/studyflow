"use client";

import { useState, useEffect, useRef } from "react";
import { loadData, saveData } from "@/lib/storage";

export default function usePersistentState(key, initialValue, delay = 500) {
  const [value, setValue] = useState(initialValue);
  const [hydrated, setHydrated] = useState(false);
  const saveTimer = useRef(null);

  // restore once on mount
  useEffect(() => {
    setValue(loadData(key, initialValue));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // debounced auto save, skipped until the initial restore has happened
  useEffect(() => {
    if (!hydrated) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveData(key, value);
    }, delay);

    return () => clearTimeout(saveTimer.current);
  }, [value, hydrated, key, delay]);

  return [value, setValue];
}
