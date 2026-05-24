import { useTranslation } from 'react-i18next'
import { useTypewriter } from '@/hooks/use-typewriter'
import { cn } from '@/lib/utils'

const HERO_SKILLS = [
  'NEXT.JS',
  'REACT NATIVE',
  'NODE.JS',
] as const

export function HeroTypewriterSkills() {
  const { t } = useTranslation()
  const { displayText, fullText, isComplete, prefersReducedMotion } =
    useTypewriter({
      segments: HERO_SKILLS,
    })

  return (
    <p
      className="flex w-full max-w-2xl justify-center px-2 text-center"
      aria-label={t('hero.typewriterAria', { skills: fullText })}
    >
      <span
        translate="no"
        className={cn(
          'hero-typewriter inline text-lg uppercase tracking-[0.18em] text-pretty text-accent sm:text-xl sm:tracking-[0.22em]',
          isComplete && 'hero-typewriter--complete',
        )}
        aria-live={prefersReducedMotion ? undefined : 'polite'}
        aria-atomic="true"
      >
        {displayText}
        {!isComplete && (
          <span
            className="hero-typewriter-cursor ml-0.5 inline-block align-baseline"
            aria-hidden="true"
          />
        )}
      </span>
    </p>
  )
}
