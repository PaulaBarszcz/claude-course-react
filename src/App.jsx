import { useEffect } from 'react'
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

  useEffect(() => {
    const id = location.pathname.replace('/', '')
    if (id && id !== '') markCompleted(id)
    window.scrollTo(0, 0)
  }, [location.pathname, markCompleted])

  return (
    <div className="app">
      <Sidebar completed={completed} />
      <main className="main">
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
