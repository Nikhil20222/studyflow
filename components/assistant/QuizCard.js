"use client";

import { useState } from "react";
import "./QuizCard.css";

export default function QuizCard({ index, question }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  function handleSelect(option) {
    setSelected(option);
    setRevealed(true);
  }

  return (
    <div className="quiz-card">
      <div className="quiz-card-top">
        <span className="quiz-card-number">Q{index + 1}</span>
        <span className="quiz-card-type">{question.type}</span>
      </div>

      <p className="quiz-card-question">{question.question}</p>

      {question.option ? (
        <div className="quiz-card-options">
          {question.options.map((option) => {
            let optionClass = "quiz-option";
            if (revealed && option === question.answer)
              optionClass += "correct";
            else if (
              revealed &&
              option === selected &&
              option !== question.answer
            )
              optionClass += "wrong";

            return (
              <button
                key={option}
                className={optionClass}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="quiz-card-short-answer">
          {!revealed ? (
            <button
              className="quiz-reveal-button"
              onClick={() => setRevealed(true)}
            >
              Reveal Answer
            </button>
          ) : (
            <p className="quiz-card-answer">{question.answer}</p>
          )}
        </div>
      )}
    </div>
  );
}
