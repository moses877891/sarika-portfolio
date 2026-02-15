import Section from '../components/Section.jsx'
import { profile } from '../data/profile.js'
import { surfaceCard, surfaceCardHover } from '../ui/theme.js'

export default function Certifications() {
  const list = profile.certifications ?? []

  return (
    <Section id="certifications" title="Certifications" subtitle="Professional credentials and courses.">
      {/* Responsive grid: xs:2, sm:3, md+:4 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {list.map((cert) => (
          <article
            key={cert}
            className={`h-full p-4 ${surfaceCard} ${surfaceCardHover}
                        flex items-center justify-center text-center`}
            title={cert}
          >
            <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
              {cert}
            </p>
          </article>
        ))}
      </div>
    </Section>
  )
}