import { useState } from 'react'
import { feedbacks } from '../data/quizFeedbacks'

export default function Quiz({ id, label, question, options }) {
  const [answered, setAnswered] = useState(false)
  const [selectedCorrect, setSelectedCorrect] = useState(null)
  const [wrongIndex, setWrongIndex] = useState(null)

  function handleAnswer(isCorrect, index) {
    if (answered) return
    setAnswered(true)
    setSelectedCorrect(isCorrect)
    if (!isCorrect) setWrongIndex(index)
  }

  const fb = feedbacks[id]

  return (
    <div className="quiz-container">
      <div className="quiz-label">{label || `Quiz ${id}`}</div>
      <div className="quiz-question">{question}</div>
      <div className="quiz-options">
        {options.map((opt, i) => {
          let cls = 'quiz-option'
          if (answered && opt.correct) cls += ' correct'
          if (answered && !opt.correct && i === wrongIndex) cls += ' incorrect'
          return (
            <div
              key={i}
              className={cls}
              onClick={() => handleAnswer(opt.correct, i)}
              {...(answered ? { 'aria-disabled': true } : {})}
            >
              <div className="option-letter">{String.fromCharCode(65 + i)}</div>
              {opt.text}
            </div>
          )
        })}
      </div>
      {answered && fb && (
        <div className={`quiz-feedback show ${selectedCorrect ? 'correct' : 'incorrect'}`}>
          {selectedCorrect ? `✓ ${fb.correct}` : `✗ ${fb.incorrect}`}
        </div>
      )}
    </div>
  )
}
