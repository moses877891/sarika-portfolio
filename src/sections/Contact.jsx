import Section from '../components/Section.jsx'
import { profile } from '../data/profile.js'
import { surfaceCard, surfaceCardHover } from '../ui/theme.js'

export default function Contact() {
  const { location, email, phone } = profile.contact

  return (
    <Section id="contact" title="Contact" subtitle="Feel free to reach out.">
      <div className={`p-4 ${surfaceCard} ${surfaceCardHover}`}>
        <p className="text-neutral-700 dark:text-neutral-200">{location}</p>
        <p className="mt-1">
          <a href={`mailto:${email}`} className="text-[var(--accent-600)] hover:underline dark:text-[var(--accent-500)]">
            {email}
          </a>
        </p>
        <p className="mt-1">
          <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-[var(--accent-600)] hover:underline dark:text-[var(--accent-500)]">
            {phone}
          </a>
        </p>
      </div>
    </Section>
  )
}
