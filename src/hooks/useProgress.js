import { useState, useCallback } from 'react'

const STORAGE_KEY = 'react-course-completed'

function loadCompleted() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
  } catch {
    return new Set()
  }
}

export function useProgress() {
  const [completed, setCompleted] = useState(loadCompleted)

  const markCompleted = useCallback((moduleId) => {
    setCompleted(prev => {
      if (prev.has(moduleId)) return prev
      const next = new Set(prev)
      next.add(moduleId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      return next
    })
  }, [])

  return { completed, markCompleted }
}
