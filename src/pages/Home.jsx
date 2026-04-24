import { useNavigate } from 'react-router-dom'
import { MODULES } from '../data/modules'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="content">
      <div className="hero">
        <div className="hero-tag">⚛ Angular 20 → React 19</div>
        <h1>Witaj z powrotem<br />w <em>Reakcie</em></h1>
        <p>Kurs stworzony dla kogoś, kto świetnie zna Angular — i chce przełożyć tę wiedzę na React bez cofania się do basics.</p>
        <button className="start-btn" onClick={() => navigate('/m1')}>
          Zacznij od Modułu 1 →
        </button>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num">10</div><div className="stat-label">Modułów</div></div>
          <div className="stat"><div className="stat-num">30+</div><div className="stat-label">Przykładów kodu</div></div>
          <div className="stat"><div className="stat-num">40+</div><div className="stat-label">Quizów i zadań</div></div>
        </div>
      </div>

      <div className="section-title">Co znajdziesz w kursie</div>
      <div className="module-grid">
        {MODULES.map(m => (
          <div key={m.id} className="module-card" onClick={() => navigate(`/${m.id}`)}>
            <div className="card-num">Moduł {m.num}</div>
            <div className="card-title">{m.title}</div>
            <div className="card-desc">{m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
