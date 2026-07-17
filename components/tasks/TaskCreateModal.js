"use client";

import { useState } from "react";
import { X } from "lucide-react";
import "./TaskCreateModal.css";

const subjects = ["Physics", "Chemistry", "Mathematics", "English", "Computer Science"];

export default function TaskCreateModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(subjects[0]);
  const [priority, setPriority] = useState("Medium");
  const [difficulty, setDifficulty] = useState("Medium");
  const [duration, setDuration] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    onCreate({
      id: Date.now(),
      title,
      subject,
      priority,
      difficulty,
      duration: duration || "1 hr",
      estimatedTime: estimatedTime || "1 hr",
      deadline: deadline || "Today",
      status: "Pending",
    });

    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Create Task</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Title</label>
            <input
              type="text"
              placeholder="e.g. Revise Thermodynamics chapter"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Subject</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Difficulty</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div className="form-field">
              <label>Duration</label>
              <input
                type="text"
                placeholder="e.g. 1.5 hrs"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Estimated Time</label>
              <input
                type="text"
                placeholder="e.g. 2 hrs"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Deadline</label>
              <input
                type="text"
                placeholder="e.g. Today, 6:00 PM"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-submit">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
