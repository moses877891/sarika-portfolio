import Section from '../components/Section.jsx'
import { profile } from '../data/profile.js'
import { surfaceCard, surfaceCardHover } from '../ui/theme.js'

export default function Additional() {
  const awards = profile.additional?.awards ?? []

  return (
    <Section id="additional" title="Additional Information" subtitle="Awards and highlights.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <article className={`p-4 ${surfaceCard} ${surfaceCardHover}`}>
          <h3 className="font-medium">Awards</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-neutral-800 dark:text-neutral-200">
            {awards.map(a => <li key={a}>{a}</li>)}
          </ul>
        </article>
      </div>
    </Section>
  )
}