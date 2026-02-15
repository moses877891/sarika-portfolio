import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import Hero from './sections/Hero.jsx'
import Experience from './sections/Experience.jsx'
import Skills from './sections/Skills.jsx'
import Education from './sections/Education.jsx'
import Certifications from './sections/Certifications.jsx'
import Additional from './sections/Additional.jsx'
import Contact from './sections/Contact.jsx'

export default function App() {
  return (
    <div
      className="
        min-h-screen text-neutral-900 dark:text-neutral-100 bg-grain
        bg-[radial-gradient(1200px_800px_at_20%_-10%,var(--glow-1),transparent_65%),radial-gradient(1000px_700px_at_100%_0%,var(--glow-2),transparent_60%),linear-gradient(180deg,var(--bg0)_0%,var(--bg1)_40%,var(--bg2)_100%)]
        transition-colors duration-300 my-3
      "
    >
      <Navbar />

      {/* Optional decorative blobs; remove if not needed */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-10 size-[420px] rounded-full
                        bg-[color-mix(in_oklab,var(--accent-500)_30%,transparent)]
                        blur-3xl animate-[float_14s_ease-in-out_infinite] motion-reduce:animate-none" />
        <div className="absolute top-10 right-[-60px] size-[360px] rounded-full
                        bg-[color-mix(in_oklab,var(--accent-500)_22%,transparent)]
                        blur-3xl animate-[float_16s_ease-in-out_infinite_reverse] motion-reduce:animate-none" />
      </div>

      <main className="mx-auto max-w-6xl px-4">
        <Hero />
        <Experience />
        <Skills />
        <Education />
        <Certifications />
        <Additional />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}