import { useState } from 'react'
import Section from '../components/Section.jsx'
import Modal from '../components/Modal.jsx'
import { profile } from '../data/profile.js'
import { surfaceCard, surfaceCardHover, primaryBtn } from '../ui/theme.js'

export default function Education() {
  const items = profile.education ?? []
  const [selected, setSelected] = useState(null)

  return (
    <Section id="education" title="Education" subtitle="Academic background and credentials.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {items.map((edu) => (
          <article
            key={`${edu.school}-${edu.years}`}
            className={`group h-full p-4 ${surfaceCard} ${surfaceCardHover} flex flex-col`}
          >
            <header className="min-w-0">
              <h3 className="font-medium tracking-tight">{edu.degree}</h3>
              <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-300 truncate">
                {edu.school}
              </p>
            </header>

            <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
              {edu.years}
            </div>

            <div className="mt-4 mb-2 grow" />
            <div className="mt-auto">
              <button
                type="button"
                onClick={() => setSelected(edu)}
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
        ))}
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? selected.degree : ''}
      >
        {selected && (
          <div className="space-y-2">
            <p className="text-neutral-700 dark:text-neutral-200">
              <strong className="font-medium">Institution:</strong> {selected.school}
            </p>
            <p className="text-neutral-700 dark:text-neutral-200">
              <strong className="font-medium">Years:</strong> {selected.years}
            </p>
          </div>
        )}
      </Modal>
    </Section>
  )
}