import { useNavigate, useLocation } from 'react-router-dom'
import { NAV_LABELS } from '../data/modules'

const MODULE_IDS = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10']

export default function Sidebar({ completed }) {
  const navigate = useNavigate()
  const location = useLocation()
  const current = location.pathname.replace('/', '') || 'home'

  const done = MODULE_IDS.filter(id => completed.has(id)).length
  const pct = Math.round((done / MODULE_IDS.length) * 100)

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">⚛</div>
          <div>
            <div className="logo-text">React dla Angular Dev</div>
            <div className="logo-sub">Kurs interaktywny</div>
          </div>
        </div>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-label">
          <span>Postęp</span>
          <span>{pct}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-section-label">Start</div>
        <NavItem id="home" num="0" label="Wprowadzenie" current={current} completed={completed} onClick={() => navigate('/')} />
      </div>

      <div className="nav-section">
        <div className="nav-section-label">Moduły</div>
        {MODULE_IDS.map((id, i) => (
          <NavItem
            key={id}
            id={id}
            num={i + 1}
            label={NAV_LABELS[id]}
            current={current}
            completed={completed}
            onClick={() => navigate(`/${id}`)}
          />
        ))}
      </div>
    </nav>
  )
}

function NavItem({ id, num, label, current, completed, onClick }) {
  const isActive = current === id
  const isDone = completed.has(id) && !isActive

  let cls = 'nav-item'
  if (isActive) cls += ' active'
  else if (isDone) cls += ' completed'

  return (
    <div className={cls} onClick={onClick}>
      <div className="nav-num">{num}</div>
      {label}
    </div>
  )
}
