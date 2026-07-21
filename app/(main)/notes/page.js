"use client";

import { useState } from "react";
import { Plus, NotebookPen } from "lucide-react";
import NoteCard from "@/components/notes/NoteCard";
import NotesFilterBar from "@/components/notes/NotesFilterBar";
import NoteEditor from "@/components/notes/NoteEditor";
import NotePreviewPanel from "@/components/notes/NotePreviewPanel";
import EmptyState from "@/components/ui/EmptyState";
import usePersistentState from "@/hooks/usePersistentState";
import { STORAGE_KEYS } from "@/lib/storage";
import "./notes.css";

const initialNotes = [
  {
    id: 1,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    category: "Class Notes",
    content:
      "First Law: An object stays at rest or in uniform motion unless acted upon by an external force.\n\nSecond Law: F = ma. The rate of change of momentum is directly proportional to the applied force.\n\nThird Law: For every action, there is an equal and opposite reaction. Important for solving pulley and friction problems.",
    updatedAt: "2 hours ago",
    pinned: true,
    favorite: true,
    recent: true,
  },
  {
    id: 2,
    title: "Periodic Table Trends",
    subject: "Chemistry",
    category: "Revision",
    content:
      "Atomic radius decreases across a period and increases down a group. Ionization energy generally increases across a period. Electronegativity is highest for elements in the top right of the table, excluding noble gases.",
    updatedAt: "Yesterday",
    pinned: true,
    favorite: false,
    recent: false,
  },
  {
    id: 3,
    title: "Integration Formulas Cheat Sheet",
    subject: "Mathematics",
    category: "Formulas",
    content:
      "∫x^n dx = x^(n+1)/(n+1) + C\n∫sin(x) dx = -cos(x) + C\n∫cos(x) dx = sin(x) + C\n∫e^x dx = e^x + C\n∫1/x dx = ln|x| + C\n\nRemember integration by parts: ∫u dv = uv − ∫v du",
    updatedAt: "5 hours ago",
    pinned: false,
    favorite: true,
    recent: true,
  },
  {
    id: 4,
    title: "Comprehension Techniques",
    subject: "English",
    category: "Summary",
    content:
      "Read the passage twice — once for overall meaning, once for detail. Underline keywords in the questions before scanning the passage. Answer in your own words wherever possible instead of copying sentences directly.",
    updatedAt: "3 days ago",
    pinned: false,
    favorite: false,
    recent: false,
  },
  {
    id: 5,
    title: "Sorting Algorithms Overview",
    subject: "Computer Science",
    category: "Class Notes",
    content:
      "Bubble Sort: O(n^2), simple but slow. Merge Sort: O(n log n), stable, uses extra space. Quick Sort: O(n log n) average, in-place, worst case O(n^2). Always compare based on the size and nature of the input before choosing.",
    updatedAt: "1 hour ago",
    pinned: false,
    favorite: true,
    recent: true,
  },
  {
    id: 6,
    title: "Doubts — Rotational Dynamics",
    subject: "Physics",
    category: "Doubts",
    content:
      "Still confused about the difference between moment of inertia for a solid sphere vs a hollow sphere. Need to re-derive the parallel axis theorem and check torque direction using the right-hand rule again.",
    updatedAt: "4 days ago",
    pinned: false,
    favorite: false,
    recent: false,
  },
  {
    id: 7,
    title: "Organic Reactions Summary",
    subject: "Chemistry",
    category: "Summary",
    content:
      "SN1 reactions proceed via a carbocation intermediate and favor tertiary substrates. SN2 reactions are single-step and favor primary substrates with a strong nucleophile. Elimination reactions compete with substitution depending on the base strength.",
    updatedAt: "6 hours ago",
    pinned: false,
    favorite: false,
    recent: true,
  },
  {
    id: 8,
    title: "Trigonometric Identities",
    subject: "Mathematics",
    category: "Formulas",
    content:
      "sin²θ + cos²θ = 1\n1 + tan²θ = sec²θ\n1 + cot²θ = cosec²θ\nsin(2θ) = 2 sinθ cosθ\ncos(2θ) = cos²θ − sin²θ",
    updatedAt: "2 days ago",
    pinned: true,
    favorite: false,
    recent: false,
  },
  {
    id: 9,
    title: "Data Structures — Big O Notes",
    subject: "Computer Science",
    category: "Revision",
    content:
      "Array access: O(1). Linked list search: O(n). Binary search on sorted array: O(log n). Hash map average lookup: O(1). Always consider worst case for competitive exam-style questions, not just average case.",
    updatedAt: "Yesterday",
    pinned: false,
    favorite: true,
    recent: false,
  },
];

export default function NotesPage() {
  const [notes, setNotes] = usePersistentState(STORAGE_KEYS.NOTES, initialNotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  function togglePin(id) {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, pinned: !note.pinned } : note))
    );
  }

  function toggleFavorite(id) {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, favorite: !note.favorite } : note))
    );
  }

  function openCreateEditor() {
    setEditingNote(null);
    setShowEditor(true);
  }

  function openEditEditor(note) {
    setSelectedNoteId(null);
    setEditingNote(note);
    setShowEditor(true);
  }

  function handleSaveNote(data) {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingNote.id ? { ...note, ...data, updatedAt: "Just now" } : note
        )
      );
    } else {
      setNotes((prev) => [
        {
          id: Date.now(),
          ...data,
          updatedAt: "Just now",
          pinned: false,
          favorite: false,
          recent: true,
        },
        ...prev,
      ]);
    }
  }

  function handleDeleteNote(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (selectedNoteId === id) setSelectedNoteId(null);
  }

  const pinnedNotes = notes.filter((note) => note.pinned);

  const filteredNotes = notes.filter((note) => {
    if (activeFilter === "Pinned" && !note.pinned) return false;
    if (activeFilter === "Favorites" && !note.favorite) return false;
    if (activeFilter === "Recent" && !note.recent) return false;
    if (!["All", "Pinned", "Favorites", "Recent"].includes(activeFilter) && note.subject !== activeFilter)
      return false;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return note.title.toLowerCase().includes(term) || note.content.toLowerCase().includes(term);
    }

    return true;
  });

  const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

  return (
    <div className="notes-page">
      <div className="notes-header">
        <div>
          <h1 className="notes-title">Notes</h1>
          <p className="notes-subtitle">Capture, organize and revisit everything you learn.</p>
        </div>
        <button className="notes-add-button" onClick={openCreateEditor}>
          <Plus size={16} />
          New Note
        </button>
      </div>

      <NotesFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {pinnedNotes.length > 0 && activeFilter === "All" && !searchTerm && (
        <div className="notes-pinned-section">
          <p className="notes-section-label">Pinned Notes</p>
          <div className="notes-pinned-row">
            {pinnedNotes.map((note) => (
              <div key={note.id} className="notes-pinned-item">
                <NoteCard
                  note={note}
                  onOpen={setSelectedNoteId}
                  onTogglePin={togglePin}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="notes-section-label">
        {activeFilter === "All" ? "All Notes" : activeFilter} ({filteredNotes.length})
      </p>

      {filteredNotes.length === 0 ? (
        <EmptyState
          icon={NotebookPen}
          title="No notes found"
          subtitle="Try a different search term or filter, or create a new note."
        />
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onOpen={setSelectedNoteId}
              onTogglePin={togglePin}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      {selectedNote && (
        <NotePreviewPanel
          note={selectedNote}
          onClose={() => setSelectedNoteId(null)}
          onEdit={openEditEditor}
          onDelete={handleDeleteNote}
          onTogglePin={togglePin}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {showEditor && (
        <NoteEditor
          note={editingNote}
          onClose={() => setShowEditor(false)}
          onSave={handleSaveNote}
        />
      )}
    </div>
  );
}
