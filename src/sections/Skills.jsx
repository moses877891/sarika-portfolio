import { useMemo, useState } from 'react'
import Section from '../components/Section.jsx'
import Modal from '../components/Modal.jsx'
import { profile } from '../data/profile.js'
import { surfaceCard, surfaceCardHover, primaryBtn } from '../ui/theme.js'

export default function Skills() {
  const categories = profile.skills?.categories ?? []
  const maxCount = useMemo(
    () => Math.max(1, ...categories.map(c => c.items.length)),
    [categories]
  )
  const [selected, setSelected] = useState(null)

  return (
    <Section id="skills" title="Skills" subtitle="Core technologies and tools.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {categories.map((cat) => {
          const count = cat.items.length
          const width = Math.round((count / maxCount) * 100)

          return (
            <article
              key={cat.title}
              className={`group h-full p-4 ${surfaceCard} ${surfaceCardHover} flex flex-col`}
            >
              <header className="flex items-start justify-between gap-3">
                <h3 className="font-medium tracking-tight">{cat.title}</h3>
                <span className="text-sm text-neutral-600 dark:text-neutral-300">
                  {count} {count === 1 ? 'skill' : 'skills'}
                </span>
              </header>

              {/* Mini normalized bar */}
              <div className="mt-4">
                <div className="relative h-3 w-full rounded-full bg-neutral-200/70 dark:bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--accent-600)]/90 transition-all duration-300"
                    style={{ width: `${width}%` }}
                    aria-hidden="true"
                  />
                </div>
                <span className="sr-only">{count} {count === 1 ? 'skill' : 'skills'} in {cat.title}</span>
              </div>

              <div className="mt-4 mb-2 grow" />
              <div className="mt-auto">
                <button
                  type="button"
                  onClick={() => setSelected(cat)}
                  className={primaryBtn}
                >
                  {/* Eye icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" className="fill-current">
                    <path d="M12 5c-5.5 0-9.5 5.5-9.5 7s4 7 9.5 7 9.5-5.5 9.5-7-4-7-9.5-7Zm0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5Zm0-8a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 9Z"/>
                  </svg>
                  View more
                </button>
              </div>
            </article>
          )
        })}
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.title} - ${selected.items.length} ${selected.items.length === 1 ? 'skill' : 'skills'}` : ''}
      >
        {selected && (
          <ul className="list-disc pl-5 space-y-1 text-neutral-800 dark:text-neutral-200">
            {selected.items.map((s) => <li key={s}>{s}</li>)}
          </ul>
        )}
      </Modal>
    </Section>
  )
}