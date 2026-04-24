import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { useProgress } from './hooks/useProgress'

import Home      from './pages/Home'
import Module01  from './pages/Module01'
import Module02  from './pages/Module02'
import Module03  from './pages/Module03'
import Module04  from './pages/Module04'
import Module05  from './pages/Module05'
import Module06  from './pages/Module06'
import Module07  from './pages/Module07'
import Module08  from './pages/Module08'
import Module09  from './pages/Module09'
import Module10  from './pages/Module10'

const MODULE_ROUTES = [
  ['/m1', Module01], ['/m2', Module02], ['/m3', Module03],
  ['/m4', Module04], ['/m5', Module05], ['/m6', Module06],
  ['/m7', Module07], ['/m8', Module08], ['/m9', Module09],
  ['/m10', Module10],
]

export default function App() {
  const { completed, markCompleted } = useProgress()
  const location = useLocation()
  const [light, setLight] = useState(() => localStorage.getItem('theme') === 'light')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const id = location.pathname.replace('/', '')
    if (id) markCompleted(id)
    window.scrollTo(0, 0)
    setMenuOpen(false)
  }, [location.pathname, markCompleted])

  useEffect(() => {
    document.documentElement.className = light ? 'light' : ''
    localStorage.setItem('theme', light ? 'light' : 'dark')
  }, [light])

  return (
    <div className="app">
      <div className={`sidebar-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />
      <Sidebar
        completed={completed}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        light={light}
        onToggleTheme={() => setLight(v => !v)}
      />
      <main className="main">
        <div className="mobile-header">
          <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            <span /><span /><span />
          </button>
          <div className="logo-text">React dla Angular Dev</div>
          <button className="theme-toggle" onClick={() => setLight(v => !v)} aria-label="Zmień motyw">
            {light ? '🌙' : '☀️'}
          </button>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          {MODULE_ROUTES.map(([path, Component]) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </main>
    </div>
  )
}
