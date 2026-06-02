import { GraduationCap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionHeading } from '@/components/section-heading'
import { getStringArray } from '@/lib/i18n-helpers'

export function EducationSection() {
  const { t } = useTranslation()

  return (
    <section
      id="education"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-16"
      aria-labelledby="education-heading"
    >
      <div className="flex flex-col gap-12">
        <SectionHeading
          icon={GraduationCap}
          id="education-heading"
          className="text-accent"
        >
          {t('sections.education')}
        </SectionHeading>
        <article className="max-w-2xl border border-[#1a1a1a] bg-surface p-8">
          <h3 className="font-display text-2xl uppercase tracking-wide">
            {t('education.degree')}
          </h3>
          <p className="mt-2 text-sm font-bold tracking-widest text-foreground">
            {t('education.school')}
          </p>
          <p className="mt-2 text-xs font-bold tracking-widest text-accent-glow">
            {t('education.period')} · {t('education.gpa')}
          </p>
          <ul className="mt-4 space-y-2 text-base leading-6 text-muted-foreground">
            {getStringArray(t, 'education.highlights').map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
