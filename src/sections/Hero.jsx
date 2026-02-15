import { profile } from '../data/profile.js'
import { primaryBtn } from '../ui/theme.js'

export default function Hero() {
  const { name } = profile.contact

  return (
    <section id="top" className="py-16 md:py-20">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        {name}
      </h1>
      <p className="mt-2 text-lg text-neutral-700 dark:text-neutral-300">
        {profile.headline}
      </p>
      <p className="mt-4 max-w-3xl text-neutral-600 dark:text-neutral-300">
        {profile.summary}
      </p>

      <div className="mt-6 flex items-center gap-3">
        <a href="#contact" className={primaryBtn}>
          {/* Mail icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" className="fill-current">
            <path d="M20 4H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/>
          </svg>
          Get in touch
        </a>
      </div>
    </section>
  )
}