import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const THEMES = ['rose', 'berry', 'winter']
const DEFAULT_THEME = 'rose'

const ThemeContext = createContext({ theme: DEFAULT_THEME, setTheme: () => {}, THEMES })

export function ThemeProvider({ children }) {
  const [theme, _setTheme] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    return THEMES.includes(saved) ? saved : DEFAULT_THEME
  })

  // safer, animated setter
  const setTheme = (next) => {
    if (!THEMES.includes(next) || next === theme) return

    const doSwitch = () => {
      document.documentElement.setAttribute('data-theme', next)
      localStorage.setItem('theme', next)
      _setTheme(next)

      // tiny accent pulse (visual feedback)
      const dot = document.createElement('div')
      dot.className = 'theme-pulse-dot'
      document.body.appendChild(dot)
      setTimeout(() => dot.remove(), 650)
    }

    try {
      // Optional View Transitions API (Chrome/Edge; safe to skip elsewhere)
      const startVT = document.startViewTransition
      if (typeof startVT === 'function') {
        startVT(() => doSwitch())
        return
      }
    } catch {
      // no-op: fall through to doSwitch
    }

    doSwitch()
  }

  // ensure attribute on first paint
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, []) // run once

  const value = useMemo(() => ({ theme, setTheme, THEMES }), [theme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)