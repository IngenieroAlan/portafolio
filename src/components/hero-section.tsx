import { MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { HeroTypewriterSkills } from '@/components/hero-typewriter-skills'
import { CONTACT, IMAGES } from '@/data/portfolio-structure'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section
      id="hero"
      className="relative flex min-h-[819px] flex-col items-center justify-center overflow-hidden px-4 py-24 sm:px-16"
      aria-labelledby="hero-heading"
      data-node-id="2:7"
    >
      <div className="hero-glass relative z-0 flex w-full max-w-2xl flex-col items-center gap-6 rounded-2xl px-6 py-10 text-center sm:px-12 sm:py-14">
        <div className="relative size-56 rounded-full border border-white/10 bg-[#131313]/80 p-2 shadow-[0_0_20px_rgba(0,163,255,0.25)]">
          <div className="relative size-full overflow-hidden rounded-full">
            <img
              src={IMAGES.profile}
              alt={t('a11y.profileAlt')}
              className="size-full object-cover object-center"
              width={224}
              height={224}
            />
          </div>
        </div>
        <p className="font-display text-lg uppercase tracking-[0.25em] text-muted-foreground sm:text-xl">
          Brandon Alan Rodríguez Ramírez
        </p>
        <h1
          id="hero-heading"
          className="font-display text-4xl uppercase tracking-[0.2em] text-[#e5e2e1] sm:text-[64px] sm:leading-[1.1]"
        >
          {t('hero.title')}
        </h1>
        <HeroTypewriterSkills />
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          {t('hero.bio')}
        </p>
        <p className="flex items-center gap-2 text-sm tracking-widest text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-accent" aria-hidden />
          {CONTACT.location}
        </p>
      </div>
    </section>
  )
}
