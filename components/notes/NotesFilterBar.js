import { Search } from "lucide-react";
import "./NotesFilterBar.css";

const filters = ["All", "Pinned", "Favorites", "Recent"];
const subjects = ["Physics", "Chemistry", "Mathematics", "English", "Computer Science"];

export default function NotesFilterBar({ searchTerm, onSearchChange, activeFilter, onFilterChange }) {
  return (
    <div className="notes-filter-bar">
      <div className="notes-search">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search notes by title or content..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="notes-filter-chips">
        {filters.map((filter) => (
          <button
            key={filter}
            className={activeFilter === filter ? "note-filter-chip active" : "note-filter-chip"}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}

        <span className="notes-filter-divider" />

        {subjects.map((subject) => (
          <button
            key={subject}
            className={activeFilter === subject ? "note-filter-chip active" : "note-filter-chip"}
            onClick={() => onFilterChange(subject)}
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
}
