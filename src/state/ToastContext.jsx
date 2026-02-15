import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const ToastContext = createContext({ show: (_msg) => {} })

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]) // [{ id, message }]
  const idRef = useRef(0)

  const show = useCallback((message) => {
    const id = ++idRef.current
    setToasts((prev) => [...prev, { id, message }])
    // Auto-hide after 1.8s (reduced for quick feedback)
    setTimeout(() => {
      setToasts((prev) => prev.filter(t => t.id !== id))
    }, 2400)
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <ToastViewport toasts={toasts} />
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

/* Viewport renders all current toasts via a portal */
function ToastViewport({ toasts }) {
  if (typeof document === 'undefined') return null
  return createPortal(
    <div
      className="
        fixed inset-x-0 bottom-4 z-[1000] flex flex-col items-center gap-2 px-4
        pointer-events-none
      "
      aria-live="polite" aria-atomic="true"
    >
      {toasts.map(t => (
        <ToastItem key={t.id} message={t.message} />
      ))}
    </div>,
    document.body
  )
}

function ToastItem({ message }) {
  return (
    <div
      className="
        max-w-[92vw] sm:max-w-md w-max pointer-events-auto
        rounded-lg border border-neutral-200/70 dark:border-neutral-800
        bg-[color-mix(in_oklab,white_95%,var(--bg0))] dark:bg-[color-mix(in_oklab,var(--bg0)_70%,transparent)]
        shadow-lg px-3.5 py-2
        text-sm text-neutral-900 dark:text-neutral-100
        ring-1 ring-black/5 dark:ring-white/10

        animate-[toastIn_180ms_ease-out_forwards]
        data-[leaving=true]:animate-[toastOut_140ms_ease-in_forwards]
      "
      role="status"
    >
      {/* Accent dot + message */}
      <div className="flex items-center gap-2">
        <span className="inline-block size-2.5 rounded-full bg-[var(--accent-600)]" />
        <span>{message}</span>
      </div>
    </div>
  )
}