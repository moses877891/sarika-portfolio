export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="py-12 md:py-16 scroll-mt-20">
      {(title || subtitle) && (
        <header className="mb-6">
          {title && <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>}
          {subtitle && (
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  )
}