"use client";

import { useState, useEffect } from "react";
import { loadData, saveData, STORAGE_KEYS } from "@/lib/storage";
import "./WelcomeModal.css";

export default function WelcomeModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadySeen = loadData(STORAGE_KEYS.ONBOARDING, false);
    if (!alreadySeen) setVisible(true);
  }, []);

  function handleDismiss() {
    saveData(STORAGE_KEYS.ONBOARDING, true);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="welcome-backdrop">
      <div className="welcome-panel">
        <div className="welcome-mark">SF</div>
        <h2 className="welcome-title">Welcome to StudyFlow!</h2>
        <p className="welcome-text">
          Your study data is automatically saved on this device.
        </p>
        <p className="welcome-subtext">No account required.</p>
        <button className="welcome-button" onClick={handleDismiss}>
          Got it
        </button>
      </div>
    </div>
  );
}
