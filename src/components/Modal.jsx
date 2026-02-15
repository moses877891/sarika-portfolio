import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ open, onClose, title, children }) {
  const dialogRef = useRef(null)
  const lastActiveRef = useRef(null)
  const titleIdRef = useRef(`modal-title-${Math.random().toString(36).slice(2)}`)

  useEffect(() => {
    if (!open) return
    lastActiveRef.current = document.activeElement

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusFirst = () => {
      const el = dialogRef.current
      if (!el) return
      const focusables = el.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
      if (focusables.length) focusables[0].focus()
      else el.focus()
    }
    focusFirst()

    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
      if (e.key === 'Tab') {
        const el = dialogRef.current
        if (!el) return
        const focusables = el.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          last.focus(); e.preventDefault()
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus(); e.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', onKey)
      lastActiveRef.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog" aria-modal="true" aria-labelledby={titleIdRef.current} tabIndex={-1}
        className="
          relative mx-4 w-full max-w-2xl overflow-hidden rounded-xl
          border border-neutral-200/70 dark:border-neutral-800 shadow-xl
          bg-[var(--card-surface-light)] dark:bg-neutral-900
          transition duration-150 ease-out motion-reduce:transition-none
          dark:text-neutral-100
        "
      >
        <div className="flex items-start justify-between gap-3 px-4 py-3
                        border-b border-[var(--divider)]">
          <h3 id={titleIdRef.current} className="font-semibold tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded hover:bg-white/70 dark:hover:bg-neutral-900/70"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" className="fill-current">
              <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 1 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4Z"/>
            </svg>
          </button>
        </div>

        <div className="px-4 py-4">
          {children}
          <div className="mt-6 flex justify-end gap-2 border-t border-[var(--divider)] pt-3">
            <button
              onClick={onClose}
              className="inline-flex items-center rounded-lg border border-neutral-300
                         px-3 py-2 text-sm text-neutral-800 dark:text-neutral-100
                         bg-[color-mix(in_oklab,white_72%,var(--bg0))] hover:bg-white
                         dark:bg-[color-mix(in_oklab,var(--bg0)_40%,transparent)]
                         dark:hover:bg-[color-mix(in_oklab,var(--bg0)_55%,transparent)]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-500)]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}