import { useNavigate } from 'react-router-dom'

function toRoute(id) {
  return !id || id === 'home' ? '/' : `/${id}`
}

export default function NavButtons({ prev, next, nextLabel = 'Następny moduł →', prevLabel }) {
  const navigate = useNavigate()
  return (
    <div className="nav-buttons">
      {prev && (
        <button className="nav-btn prev" onClick={() => navigate(toRoute(prev))}>
          ← {prevLabel || 'Poprzedni'}
        </button>
      )}
      {next && (
        <button className="nav-btn next" onClick={() => navigate(toRoute(next))}>
          {nextLabel}
        </button>
      )}
    </div>
  )
}
