"use client";

import { useState } from "react";
import { X } from "lucide-react";
import "./GoalForm.css";

const subjects = ["Physics", "Chemistry", "Mathematics", "English", "Computer Science"];

export default function GoalForm({ goal, onClose, onSave }) {
  const [title, setTitle] = useState(goal?.title || "");
  const [subject, setSubject] = useState(goal?.subject || subjects[0]);
  const [deadline, setDeadline] = useState(goal?.deadline || "");
  const [progress, setProgress] = useState(goal?.progress ?? 0);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title,
      subject,
      deadline: deadline || "No deadline set",
      progress: Number(progress),
      completed: Number(progress) >= 100,
    });

    onClose();
  }

  return (
    <div className="goal-form-backdrop" onClick={onClose}>
      <div className="goal-form-panel" onClick={(e) => e.stopPropagation()}>
        <div className="goal-form-header">
          <h3>{goal ? "Edit Goal" : "New Goal"}</h3>
          <button className="goal-form-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form className="goal-form" onSubmit={handleSubmit}>
          <div className="goal-form-field">
            <label>Title</label>
            <input
              type="text"
              placeholder="e.g. Finish Organic Chemistry syllabus"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="goal-form-row">
            <div className="goal-form-field">
              <label>Subject</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="goal-form-field">
              <label>Deadline</label>
              <input
                type="text"
                placeholder="e.g. 30 Aug 2026"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>

          <div className="goal-form-field">
            <label>Progress</label>
            <div className="goal-form-slider-row">
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
              />
              <span>{progress}%</span>
            </div>
          </div>

          <div className="goal-form-actions">
            <button type="button" className="goal-form-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="goal-form-submit">
              {goal ? "Save Changes" : "Create Goal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
