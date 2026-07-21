"use client";

import { useState, useRef } from "react";
import { Download, Upload, Trash2, CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import usePersistentState from "@/hooks/usePersistentState";
import { STORAGE_KEYS, exportAllData, importAllData, resetAllData } from "@/lib/storage";
import "./settings.css";

const initialSettings = {
  dailyGoalHours: 6,
  reminders: true,
};

export default function SettingsPage() {
  const [settings, setSettings] = usePersistentState(STORAGE_KEYS.SETTINGS, initialSettings);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  function updateSetting(key, value) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function handleExport() {
    const data = exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "studyflow-backup.json";
    link.click();

    URL.revokeObjectURL(url);
    setMessage("Backup file downloaded.");
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleImportFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      try {
        const parsed = JSON.parse(loadEvent.target.result);
        const result = importAllData(parsed);

        if (result.success) {
          setMessage("Data imported successfully. Reloading...");
          setTimeout(() => window.location.reload(), 1000);
        } else {
          setMessage(result.message);
        }
      } catch (error) {
        setMessage("That file isn't valid JSON.");
      }
    };

    reader.readAsText(file);
    event.target.value = "";
  }

  function handleReset() {
    const confirmed = window.confirm(
      "This will permanently delete all StudyFlow data on this device. Continue?"
    );
    if (!confirmed) return;

    resetAllData();
    window.location.reload();
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">
          Everything is saved automatically to this device — no account needed.
        </p>
      </div>

      <div className="settings-grid">
        <Card title="Study Preferences">
          <div className="settings-field">
            <label>Daily Study Goal (hours)</label>
            <input
              type="number"
              min="1"
              max="16"
              step="0.5"
              value={settings.dailyGoalHours}
              onChange={(e) => updateSetting("dailyGoalHours", Number(e.target.value))}
            />
          </div>

          <div className="settings-toggle-row">
            <div>
              <p className="settings-toggle-label">Study Reminders</p>
              <span className="settings-toggle-hint">Gentle nudges to stay on track</span>
            </div>
            <button
              className={settings.reminders ? "settings-switch on" : "settings-switch"}
              onClick={() => updateSetting("reminders", !settings.reminders)}
            >
              <span className="settings-switch-knob" />
            </button>
          </div>
        </Card>

        <Card title="Your Data">
          <p className="settings-data-text">
            Export a backup, restore from a previous backup, or start fresh.
          </p>

          <div className="settings-actions">
            <button className="settings-action-button" onClick={handleExport}>
              <Download size={16} />
              Export Data
            </button>

            <button className="settings-action-button" onClick={handleImportClick}>
              <Upload size={16} />
              Import Data
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              className="settings-file-input"
              onChange={handleImportFile}
            />

            <button className="settings-action-button danger" onClick={handleReset}>
              <Trash2 size={16} />
              Reset All Data
            </button>
          </div>

          {message && (
            <p className="settings-message">
              <CheckCircle2 size={14} />
              {message}
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
