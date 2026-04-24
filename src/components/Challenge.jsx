import { useState } from 'react'

export default function Challenge({ label = '🎯 Zadanie', title, desc, hints = [] }) {
  const [showHints, setShowHints] = useState(false)

  return (
    <div className="challenge">
      <div className="challenge-label">{label}</div>
      <div className="challenge-title">{title}</div>
      <div className="challenge-desc" dangerouslySetInnerHTML={{ __html: desc }} />
      {hints.length > 0 && (
        <div className="challenge-hints">
          <button className="hint-toggle" onClick={() => setShowHints(v => !v)}>
            {showHints ? 'Ukryj podpowiedzi' : 'Pokaż podpowiedzi'}
          </button>
          {showHints && (
            <div className="hints-content show">
              {hints.map((h, i) => (
                <div key={i} className="hint">{h}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
