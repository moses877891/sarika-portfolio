export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--divider)]">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-neutral-600 dark:text-neutral-400">
        © {new Date().getFullYear()} Sarika M
      </div>
    </footer>
  )
}