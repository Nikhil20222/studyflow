"use client";

import { useState } from "react";
import { X } from "lucide-react";
import "./NoteEditor.css";

const subjects = ["Physics", "Chemistry", "Mathematics", "English", "Computer Science"];
const categories = ["Class Notes", "Revision", "Formulas", "Summary", "Doubts"];

export default function NoteEditor({ note, onClose, onSave }) {
  const [title, setTitle] = useState(note?.title || "");
  const [subject, setSubject] = useState(note?.subject || subjects[0]);
  const [category, setCategory] = useState(note?.category || categories[0]);
  const [content, setContent] = useState(note?.content || "");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSave({
      title,
      subject,
      category,
      content,
    });

    onClose();
  }

  return (
    <div className="editor-backdrop" onClick={onClose}>
      <div className="editor-panel" onClick={(e) => e.stopPropagation()}>
        <div className="editor-header">
          <h3>{note ? "Edit Note" : "New Note"}</h3>
          <button className="editor-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form className="editor-form" onSubmit={handleSubmit}>
          <div className="editor-field">
            <label>Title</label>
            <input
              type="text"
              placeholder="e.g. Thermodynamics — Laws Summary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="editor-row">
            <div className="editor-field">
              <label>Subject</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="editor-field">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="editor-field">
            <label>Note Content</label>
            <textarea
              placeholder="Write your notes here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
            />
          </div>

          <div className="editor-actions">
            <button type="button" className="editor-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="editor-submit">
              {note ? "Save Changes" : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
