import { Settings } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionHeading } from '@/components/section-heading'
import { SKILLS } from '@/data/portfolio-structure'

export function SkillsSection() {
  const { t } = useTranslation()

  return (
    <section
      id="systems"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-16"
      aria-labelledby="systems-heading"
    >
      <div className="flex flex-col gap-12">
        <SectionHeading icon={Settings} id="systems-heading">
          {t('sections.skills')}
        </SectionHeading>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {SKILLS.map((skill) => {
            const SkillIcon = skill.icon
            return (
              <li
                key={skill.name}
                className="flex flex-col items-center gap-4 border border-border bg-surface-elevated p-6"
              >
                <SkillIcon
                  className="size-7 text-foreground"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="text-xs font-bold tracking-widest">
                  {skill.name}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
