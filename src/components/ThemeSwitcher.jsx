import { useMemo } from 'react'
import { useTheme } from '../state/ThemeContext.jsx'
import { useToast } from '../state/ToastContext.jsx'

export default function ThemeSwitcher() {
  const { theme, setTheme, THEMES } = useTheme()
  const { show } = useToast()


  // Simple, universal icons (emoji) so they render inside native <option>
  const ICONS = useMemo(
    () => ({
      rose:   '🌹',
      berry: '🍇',
      winter: '❄️',
    }),
    []
  )

  // Accent colors for the small leading icon (closed state)
  const ICON_COLOR = useMemo(
    () => ({
      rose:   '#e11d48', // rose-600
      berry: '#7c3aed', // violet-600
      winter: '#0891b2', // cyan-600
    }),
    []
  )

  const onChange = (e) => {
    const next = e.target.value
    setTheme(next)
    show(`Theme set to ${next}`)
  }

  // Current icon + accessible label
  const currentIcon = ICONS[theme] ?? '🎨'
  const currentColor = ICON_COLOR[theme] ?? '#1d4ed8'

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="sr-only">Theme</span>

      {/* Leading icon that reflects the current theme */}
      <span
        aria-hidden="true"
        className="inline-flex items-center justify-center size-5 rounded-full ring-1 ring-black/5 dark:ring-white/15"
        style={{ backgroundColor: currentColor + '22' /* ~13% alpha */, color: currentColor }}
        title="Current theme"
      >
        <span className="text-base leading-none">{currentIcon}</span>
      </span>

      <div className="relative">
        <select
          value={theme}
          onChange={onChange}
          aria-label="Select theme"
          className="
            appearance-none pr-8
            rounded-md border border-neutral-300
            bg-white/80 dark:bg-neutral-900/80 dark:border-neutral-800
            text-sm px-3 py-1.5
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-500)]
          "
        >
          {THEMES.map((t) => (
            <option key={t} value={t}>
              {t[0].toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>

        {/* Chevron (decorative) */}
        <span
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 opacity-70"
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" className="fill-current">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </span>
      </div>
    </label>
  )
}   