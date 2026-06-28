import { Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionHeading } from '@/components/section-heading'
import { EXPERIENCE_STRUCTURE } from '@/data/portfolio-structure'
import { getExperienceItems, splitDescriptionLines } from '@/lib/i18n-helpers'
import { cn } from '@/lib/utils'

export function ExperienceSection() {
  const { t } = useTranslation()
  const experienceItems = getExperienceItems(t)

  return (
    <section
      id="experience"
      className="border-t border-border/30 bg-[hsl(0_0%_5%_/0.5)] px-4 pb-20 pt-32 sm:px-16"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <SectionHeading
          icon={Clock}
          id="experience-heading"
          className="text-accent"
        >
          {t('sections.experience')}
        </SectionHeading>

        <ol
          className="relative space-y-12"
          aria-label={t('a11y.experienceTimeline')}
        >
          <div
            className="absolute bottom-0 left-1/2 top-0 w-0.5 -translate-x-1/2 bg-accent-glow shadow-[0_0_10px_#00a3ff]"
            aria-hidden="true"
          />
          {EXPERIENCE_STRUCTURE.map((item, index) => {
            const experience = experienceItems[index]
            if (!experience) return null

            return (
              <li
                key={item.id}
                className={cn(
                  'relative flex justify-center',
                  item.side === 'right'
                    ? 'md:justify-end md:pl-[58%]'
                    : 'md:justify-start md:pr-[58%]',
                )}
              >
                <article className="w-full max-w-md border border-[#1a1a1a] bg-surface p-6">
                  <h3 className="font-display text-2xl uppercase tracking-wide">
                    {experience.title}
                  </h3>
                  <p className="mt-1 text-sm font-bold tracking-widest text-foreground">
                    {experience.company}
                  </p>
                  <p className="mt-2 text-xs font-bold tracking-widest text-accent-glow">
                    {experience.period}
                  </p>
                  <div className="mt-2 text-base leading-6 text-muted-foreground">
                    {splitDescriptionLines(experience.description).map(
                      (line) => (
                        <p key={`${item.id}-${line}`}>{line}</p>
                      ),
                    )}
                  </div>
                </article>
                <span
                  className="absolute left-1/2 top-1/2 hidden size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-glow shadow-[0_0_10px_#00a3ff,0_0_20px_#00a3ff] md:block"
                  aria-hidden="true"
                />
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
