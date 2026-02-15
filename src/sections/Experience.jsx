import { useState } from 'react'
import Section from '../components/Section.jsx'
import Modal from '../components/Modal.jsx'
import { profile } from '../data/profile.js'
import { surfaceCard, surfaceCardHover, primaryBtn } from '../ui/theme.js'

export default function Experience() {
  const [selected, setSelected] = useState(null)

  return (
    <Section id="experience" title="Work Experience" subtitle="A timeline of roles with detailed impact.">
      <div className="relative pl-6">
        {/* Vertical guide only (no dots) */}
        <div className="pointer-events-none absolute left-2 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />

        <ul className="space-y-5">
          {profile.experience.map((job) => (
            <li key={`${job.role}-${job.company}-${job.start}`} className="relative">
              <div className={`group p-4 ${surfaceCard} ${surfaceCardHover}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold tracking-tight">{job.role}</h3>
                    <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-300">
                      @ {job.company} · {job.location}
                    </p>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    {job.start} - {job.end}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setSelected(job)}
                    className={primaryBtn}
                    aria-haspopup="dialog"
                    aria-expanded={!!selected}
                  >
                    {/* Eye icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" className="fill-current">
                      <path d="M12 5c-5.5 0-9.5 5.5-9.5 7s4 7 9.5 7 9.5-5.5 9.5-7-4-7-9.5-7Zm0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5Zm0-8a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 9Z"/>
                    </svg>
                    View
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={
          selected
            ? `${selected.role} @ ${selected.company} - ${selected.start}-${selected.end}`
            : ''
        }
      >
        {selected && (
          <div className="space-y-3">
            <p className="text-sm text-neutral-600 dark:text-neutral-300">{selected.location}</p>
            {selected.bullets?.length ? (
              <ul className="list-disc pl-5 space-y-1 text-neutral-800 dark:text-neutral-200">
                {selected.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            ) : (
              <p className="text-neutral-700 dark:text-neutral-200">No additional details provided.</p>
            )}
          </div>
        )}
      </Modal>
    </Section>
  )
}