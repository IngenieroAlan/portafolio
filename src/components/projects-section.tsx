import { ArrowRight, Crosshair } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionHeading } from '@/components/section-heading'
import {
  accentStyles,
  PROJECTS_PREVIEW_LIMIT,
  PROJECTS_STRUCTURE,
} from '@/data/portfolio-structure'
import { getStringArray } from '@/lib/i18n-helpers'
import { cn } from '@/lib/utils'

export function ProjectsSection() {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const hasHiddenProjects = PROJECTS_STRUCTURE.length > PROJECTS_PREVIEW_LIMIT
  const visibleProjects = expanded
    ? PROJECTS_STRUCTURE
    : PROJECTS_STRUCTURE.slice(0, PROJECTS_PREVIEW_LIMIT)

  return (
    <section
      id="missions"
      className="border-y border-border/30 bg-[hsl(0_0%_5%_/0.5)] px-4 py-20 sm:px-16"
      aria-labelledby="missions-heading"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <SectionHeading
          icon={Crosshair}
          id="missions-heading"
          className="text-accent"
        >
          {t('sections.projects')}
        </SectionHeading>

        <ul className="grid gap-8 md:grid-cols-3">
          {visibleProjects.map((project) => {
            const styles = accentStyles[project.accent]
            const title = t(`projects.${project.id}.title`)
            const description = getStringArray(
              t,
              `projects.${project.id}.description`,
            )
            const tags = getStringArray(t, `projects.${project.id}.tags`)

            return (
              <li
                key={project.id}
                className={cn(
                  'flex flex-col gap-4 border border-[#1a1a1a] bg-surface p-4',
                  styles.shadow,
                )}
              >
                <div className="h-48 overflow-hidden border border-border">
                  <img
                    src={project.image}
                    alt=""
                    className="h-[172%] w-full object-cover object-top opacity-70"
                  />
                </div>
                <h3
                  className={cn(
                    'font-display text-2xl uppercase',
                    styles.title,
                  )}
                >
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-80 focus-visible:outline-offset-4"
                    >
                      {title}
                    </a>
                  ) : (
                    title
                  )}
                </h3>
                <div className="text-base leading-6 text-muted-foreground">
                  {description.map((line) => (
                    <p key={`${project.id}-${line}`}>{line}</p>
                  ))}
                </div>
                <ul className="flex flex-wrap gap-2 border-t border-border/50 pt-4">
                  {tags.map((tag) => (
                    <li key={tag}>
                      <span
                        className={cn(
                          'inline-block border px-2 py-1 text-xs font-bold tracking-widest',
                          styles.tag,
                        )}
                      >
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>

        {hasHiddenProjects ? (
          <div className="flex justify-center pt-4">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((current) => !current)}
              className="inline-flex min-h-11 min-w-44 items-center justify-center gap-2 border border-foreground px-8 py-4 font-display text-2xl uppercase tracking-wide text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-offset-4"
            >
              {t(expanded ? 'nav.viewLess' : 'nav.viewMore')}
              <ArrowRight
                className={cn(
                  'size-4 shrink-0 transition-transform',
                  expanded && 'rotate-90',
                )}
                aria-hidden
              />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
