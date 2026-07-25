"use client";

import { useSate } from "react";
import { RotateCw } from "lucide-react";
import "./Flashcard.css";

export default function Flashcard({ question, answer }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flashcard" onClick={() => setFlipped((f) => !f)}>
      <span className="flashcard-label">{flipped ? "Answer" : "Question"}</span>
      <p className="flashcard-text">{flipped ? answer : question}</p>
      <span className="flashcard-hint">
        <RotateCw size={12} />
        Tab to {flipped ? "see question" : "reveal answer"}
      </span>
    </div>
  )
}