import { X, Pencil, Trash2, Pin, Star } from "lucide-react";
import "./NotePreviewPanel.css";

export default function NotePreviewPanel({ note, onClose, onEdit, onDelete, onTogglePin, onToggleFavorite }) {
  if (!note) return null;

  return (
    <div className="preview-backdrop" onClick={onClose}>
      <div className="preview-panel" onClick={(e) => e.stopPropagation()}>
        <div className="preview-header">
          <div className="preview-header-actions">
            <button
              className={note.pinned ? "preview-icon-button active" : "preview-icon-button"}
              onClick={() => onTogglePin(note.id)}
            >
              <Pin size={16} />
            </button>
            <button
              className={note.favorite ? "preview-icon-button active favorite" : "preview-icon-button"}
              onClick={() => onToggleFavorite(note.id)}
            >
              <Star size={16} />
            </button>
          </div>
          <button className="preview-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <span className="preview-subject-chip">{note.subject}</span>
        <h2 className="preview-title">{note.title}</h2>

        <div className="preview-meta">
          <span className="preview-category-tag">{note.category}</span>
          <span className="preview-updated">Last updated {note.updatedAt}</span>
        </div>

        <div className="preview-content">
          <p>{note.content}</p>
        </div>

        <div className="preview-actions">
          <button className="preview-edit" onClick={() => onEdit(note)}>
            <Pencil size={14} />
            Edit Note
          </button>
          <button className="preview-delete" onClick={() => onDelete(note.id)}>
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
