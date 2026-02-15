// src/components/Navbar.jsx
import { useEffect, useRef, useState } from 'react'
import ThemeSwitcher from './ThemeSwitcher.jsx'

const nav = [
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'additional', label: 'Additional' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const buttonRef = useRef(null)

  // Close on outside click (capture to avoid race with open)
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (!panelRef.current || !buttonRef.current) return
      if (panelRef.current.contains(e.target) || buttonRef.current.contains(e.target)) return
      setOpen(false)
    }
    window.addEventListener('pointerdown', onPointerDown, true)
    return () => window.removeEventListener('pointerdown', onPointerDown, true)
  }, [open])

  // Esc to close
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className="
        sticky top-0 z-50 backdrop-blur
        bg-[color-mix(in_oklab,white_78%,var(--bg0))]
        dark:bg-[color-mix(in_oklab,var(--bg0)_70%,transparent)]
        border-b border-[var(--divider)]
        relative
        /* Decorative art: right only, fade left->right */
        before:content-[''] before:absolute before:inset-0 before:-z-0
        before:bg-[image:var(--nav-art)]
        dark:before:bg-[image:var(--nav-art-dark)]
        before:bg-no-repeat
        before:[background-position:right_center]
        before:[background-size:var(--nav-art-size,380px_64px)]
        before:opacity-85 dark:before:opacity-60
        before:[-webkit-mask-image:linear-gradient(to_left,black_28%,transparent_100%)]
        before:[mask-image:linear-gradient(to_left,black_28%,transparent_100%)]
      "
    >
      {/* Top bar */}
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between relative z-10">
        {/* ✅ Brand link (fixed) */}
        <a
          href="#top"
          className="font-semibold tracking-tight text-lg hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-500)] rounded"
        >
          Portfolio<span className="text-[var(--accent-600)]">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm text-neutral-700 hover:text-[var(--accent-600)]
                         dark:text-neutral-300 dark:hover:text-[var(--accent-500)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop ThemeSwitcher */}
        <div className="hidden md:block">
          <ThemeSwitcher />
        </div>

        {/* Mobile hamburger */}
        <button
          ref={buttonRef}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(v => !v)}
          className="md:hidden p-2 rounded focus:outline-none
                     hover:bg-white/70 dark:hover:bg-neutral-900/70
                     focus-visible:ring-2 focus-visible:ring-[var(--accent-500)]"
        >
          {/* Animated hamburger (3 lines → X) */}
          <span className="relative block size-5">
            {/* line 1 */}
            <span
              className={`
                absolute left-0 top-1 block h-[2px] w-5 bg-current transition-transform duration-200
                ${open ? 'translate-y-[6px] rotate-45' : ''}
              `}
            />
            {/* line 2 */}
            <span
              className={`
                absolute left-0 top-1/2 -translate-y-1/2 block h-[2px] w-5 bg-current transition-opacity duration-150
                ${open ? 'opacity-0' : 'opacity-100'}
              `}
            />
            {/* line 3 */}
            <span
              className={`
                absolute left-0 bottom-1 block h-[2px] w-5 bg-current transition-transform duration-200
                ${open ? '-translate-y-[6px] -rotate-45' : ''}
              `}
            />
          </span>
        </button>
      </div>

      {/* Mobile dropdown panel (slides under the bar) */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`
          md:hidden overflow-hidden border-t border-[var(--divider)]
          bg-[color-mix(in_oklab,white_90%,var(--bg0))]
          dark:bg-[color-mix(in_oklab,var(--bg0)_80%,transparent)]
          transition-[max-height,opacity,transform] duration-200 ease-out
          ${open ? 'max-h-[420px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-1'}
        `}
      >
        <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-1">
          {nav.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="py-2 text-neutral-800 hover:text-[var(--accent-600)]
                         dark:text-neutral-200 dark:hover:text-[var(--accent-500)]"
            >
              {item.label}
            </a>
          ))}

          <div className="pt-2 relative z-20">
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
    </header>
  )
}