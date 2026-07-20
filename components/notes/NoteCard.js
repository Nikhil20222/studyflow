import { Pin, Star } from "lucide-react";
import "./NoteCard.css";

const subjectColors = {
  Physics: "#3E8EED",
  Chemistry: "#2FBF71",
  Mathematics: "#E11D2E",
  English: "#E0A72A",
  "Computer Science": "#9B59F6",
};

export default function NoteCard({ note, onOpen, onTogglePin, onToggleFavorite }) {
  const color = subjectColors[note.subject] || "#8A8A93";

  return (
    <div className="note-card" onClick={() => onOpen(note.id)}>
      <div className="note-card-top">
        <span className="note-subject-chip" style={{ color, borderColor: color }}>
          {note.subject}
        </span>

        <div className="note-card-actions">
          <button
            className={note.pinned ? "note-icon-button active" : "note-icon-button"}
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(note.id);
            }}
          >
            <Pin size={14} />
          </button>
          <button
            className={note.favorite ? "note-icon-button active favorite" : "note-icon-button"}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(note.id);
            }}
          >
            <Star size={14} />
          </button>
        </div>
      </div>

      <h3 className="note-card-title">{note.title}</h3>
      <p className="note-card-preview">{note.content.slice(0, 90)}...</p>

      <div className="note-card-footer">
        <span className="note-category-tag">{note.category}</span>
        <span className="note-updated">{note.updatedAt}</span>
      </div>
    </div>
  );
}
