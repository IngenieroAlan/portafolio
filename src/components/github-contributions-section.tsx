import { GitGraph } from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionHeading } from '@/components/section-heading'
import contributionsData from '@/data/github-contributions.json'
import { GITHUB } from '@/data/portfolio-structure'
import {
  getContributionStats,
  groupContributionsIntoWeeks,
  isContributionsDataEmpty,
  type ContributionDay,
  type GitHubContributionsData,
} from '@/lib/github-helpers'
import { cn } from '@/lib/utils'

const data = contributionsData as GitHubContributionsData

const HEATMAP_LEVELS = [0, 1, 2, 3, 4] as const

function formatDayLabel(date: string, locale: string, count: number): string {
  const formatted = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeZone: 'America/Mazatlan',
  }).format(new Date(`${date}T12:00:00Z`))

  return `${formatted}: ${count}`
}

function HeatmapCell({
  day,
  locale,
}: {
  day: ContributionDay
  locale: string
}) {
  const label = formatDayLabel(day.date, locale, day.count)

  return (
    <button
      type="button"
      className="heatmap-cell"
      data-level={day.level}
      aria-label={label}
      title={label}
      tabIndex={0}
    />
  )
}

export function GitHubContributionsSection() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language.startsWith('es') ? 'es-MX' : 'en-US'
  const isEmpty = isContributionsDataEmpty(data)

  const weeks = useMemo(
    () => (isEmpty ? [] : groupContributionsIntoWeeks(data.contributions)),
    [isEmpty],
  )

  const stats = useMemo(
    () => (isEmpty ? null : getContributionStats(data)),
    [isEmpty],
  )

  const graphSummary =
    stats !== null
      ? t('a11y.githubGraph', {
          total: stats.totalLastYear,
          current: stats.currentStreak,
          longest: stats.longestStreak,
        })
      : t('github.empty')

  return (
    <section
      id="github-activity"
      className="border-y border-border/30 bg-[hsl(0_0%_5%_/0.5)] px-4 py-20 sm:px-16"
      aria-labelledby="github-activity-heading"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <SectionHeading
          icon={GitGraph}
          id="github-activity-heading"
          className="text-accent-glow"
        >
          {t('sections.github')}
        </SectionHeading>

        {isEmpty ? (
          <p className="border border-border bg-surface p-6 text-base text-muted-foreground">
            {t('github.empty')}
          </p>
        ) : (
          <div className="flex flex-col gap-8 border border-[#1a1a1a] bg-surface p-6 shadow-[0_0_7.5px_rgba(0,163,255,0.12)]">
            {stats !== null && (
              <ul className="grid gap-4 sm:grid-cols-3">
                <li className="flex flex-col gap-1 border border-border/50 bg-surface-elevated p-4">
                  <span className="text-xs font-bold tracking-widest text-muted-foreground">
                    {t('github.totalLastYear')}
                  </span>
                  <span className="font-display text-3xl text-accent-glow">
                    {stats.totalLastYear}
                  </span>
                </li>
                <li className="flex flex-col gap-1 border border-border/50 bg-surface-elevated p-4">
                  <span className="text-xs font-bold tracking-widest text-muted-foreground">
                    {t('github.currentStreak')}
                  </span>
                  <span className="font-display text-3xl text-neon-green">
                    {stats.currentStreak}
                  </span>
                </li>
                <li className="flex flex-col gap-1 border border-border/50 bg-surface-elevated p-4">
                  <span className="text-xs font-bold tracking-widest text-muted-foreground">
                    {t('github.longestStreak')}
                  </span>
                  <span className="font-display text-3xl text-foreground">
                    {stats.longestStreak}
                  </span>
                </li>
              </ul>
            )}

            <div
              role="img"
              aria-label={graphSummary}
              className="flex justify-center overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]"
            >
              <p className="visually-hidden">{graphSummary}</p>
              <div className="inline-flex w-max min-w-min gap-1">
                {weeks.map((week) => (
                  <div
                    key={week[0]?.date ?? week.map((d) => d.date).join('-')}
                    className="flex flex-col gap-1"
                  >
                    {week.map((day) => (
                      <HeatmapCell key={day.date} day={day} locale={locale} />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/50 pt-4">
              <div
                className="flex items-center gap-2 text-xs font-bold tracking-widest text-muted-foreground"
                aria-hidden="true"
              >
                <span>{t('github.legendLess')}</span>
                <div className="flex gap-1">
                  {HEATMAP_LEVELS.map((level) => (
                    <span
                      key={level}
                      className="heatmap-legend-swatch"
                      data-level={level}
                    />
                  ))}
                </div>
                <span>{t('github.legendMore')}</span>
              </div>

              <a
                href={GITHUB.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex min-h-11 items-center justify-center border border-accent-glow px-6 py-2',
                  'text-xs font-bold tracking-[0.12em] text-accent-glow transition-colors',
                  'hover:bg-accent-glow/10 focus-visible:outline-offset-4',
                )}
              >
                {t('github.viewProfile')}
              </a>
            </div>
          </div>
        )}

        {!isEmpty && (
          <p className="text-xs tracking-widest text-muted-foreground">
            @{data.username} ·{' '}
            {t('github.updated', {
              date: new Intl.DateTimeFormat(locale, {
                dateStyle: 'medium',
                timeZone: 'America/Mazatlan',
              }).format(new Date(data.generatedAt)),
            })}
          </p>
        )}
      </div>
    </section>
  )
}
