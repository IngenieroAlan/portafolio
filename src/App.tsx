import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  Clock,
  Crosshair,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Radio,
  Settings,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { HeroTypewriterSkills } from '@/components/hero-typewriter-skills'
import { LanguageSwitcher } from '@/components/language-switcher'
import { ParallaxStarfield } from '@/components/parallax-starfield'
import {
  accentStyles,
  CONTACT,
  EXPERIENCE_STRUCTURE,
  FOOTER_LINK_KEYS,
  IMAGES,
  NAV_LINK_KEYS,
  PROJECTS_STRUCTURE,
  SKILLS,
} from '@/data/portfolio-structure'
import { getExperienceItems, getStringArray, splitDescriptionLines } from '@/lib/i18n-helpers'
import { cn } from '@/lib/utils'

function HeroSection() {
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

function SectionHeading({
  icon: Icon,
  id,
  children,
  className,
}: {
  icon: LucideIcon
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Icon className="size-6 shrink-0" aria-hidden />
      <h2
        id={id}
        className="font-display text-4xl uppercase tracking-wide"
      >
        {children}
      </h2>
    </div>
  )
}

function App() {
  const { t } = useTranslation()
  const experienceItems = getExperienceItems(t)

  return (
    <div
      className="relative min-h-svh w-full text-foreground"
      data-node-id="2:3"
    >
      <ParallaxStarfield />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.05] bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,hsl(0_0%_100%),transparent_70%)]"
      />
      <a
        href="#main-content"
        className="visually-hidden focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:m-0 focus:inline-block focus:h-auto focus:w-auto focus:overflow-visible focus:rounded focus:bg-accent-glow focus:px-4 focus:py-2 focus:text-background focus:[clip:auto] focus:whitespace-normal"
      >
        {t('a11y.skipToContent')}
      </a>

      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-accent-glow bg-[rgba(19,19,19,0.8)] px-4 py-4 shadow-[0_4px_12px_rgba(0,163,255,0.3)] backdrop-blur-[6px] sm:px-16"
        data-node-id="2:175"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a
            href="#hero"
            className="font-display text-2xl tracking-[-0.05em] text-accent focus-visible:outline-offset-4"
          >
            B.A. RODRÍGUEZ
          </a>
          <nav aria-label={t('a11y.mainNav')} className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NAV_LINK_KEYS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs font-bold tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-offset-4"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <nav
              aria-label={t('a11y.mobileNav')}
              className="flex gap-3 md:hidden"
            >
              <a
                href="#missions"
                className="text-xs font-bold tracking-widest text-muted-foreground"
              >
                {t('nav.archives')}
              </a>
              <a
                href="#transmissions"
                className="text-xs font-bold tracking-widest text-muted-foreground"
              >
                {t('nav.contactShort')}
              </a>
            </nav>
            <a
              href="#missions"
              className="inline-flex min-h-6 min-w-24 items-center justify-center border border-foreground px-6 py-2 text-center text-xs font-bold tracking-[0.12em] text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-offset-4"
            >
              {t('nav.viewMore')}
            </a>
          </div>
        </div>
      </header>

      <main id="main-content" className="pt-20">
        <HeroSection />

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
              {PROJECTS_STRUCTURE.map((project) => {
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
                      {description.map((line, index) => (
                        <p key={`${project.id}-desc-${index}`}>{line}</p>
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

            <div className="flex justify-center pt-4">
              <a
                href="#missions"
                className="inline-flex min-h-11 min-w-44 items-center justify-center gap-2 border border-foreground px-8 py-4 font-display text-2xl uppercase tracking-wide text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-offset-4"
              >
                {t('nav.viewMore')}
                <ArrowRight className="size-4 shrink-0" aria-hidden />
              </a>
            </div>
          </div>
        </section>

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
                      'relative flex',
                      item.side === 'right'
                        ? 'justify-end pl-0 md:pl-[58%]'
                        : 'justify-start pr-0 md:pr-[58%]',
                    )}
                  >
                    <article className="w-full max-w-md border border-[#1a1a1a] bg-surface px-6 py-6">
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
                          (line, lineIndex) => (
                            <p key={`${item.id}-line-${lineIndex}`}>{line}</p>
                          ),
                        )}
                      </div>
                    </article>
                    <span
                      className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-glow shadow-[0_0_10px_#00a3ff,0_0_20px_#00a3ff]"
                      aria-hidden="true"
                    />
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

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
            <article className="max-w-2xl border border-[#1a1a1a] bg-surface px-8 py-8">
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
                {getStringArray(t, 'education.highlights').map(
                  (highlight, index) => (
                    <li key={`education-highlight-${index}`}>{highlight}</li>
                  ),
                )}
              </ul>
            </article>
          </div>
        </section>

        <section
          id="transmissions"
          className="border-t border-border/30 bg-[hsl(0_0%_5%_/0.3)] px-4 py-20 sm:px-16 lg:px-64"
          aria-labelledby="transmissions-heading"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-12">
            <SectionHeading
              icon={Radio}
              id="transmissions-heading"
              className="text-accent"
            >
              {t('sections.contact')}
            </SectionHeading>

            <ul className="grid gap-4 sm:grid-cols-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex min-h-11 flex-col items-center justify-center gap-2 border border-border bg-surface-elevated p-4 text-center transition-colors hover:border-accent hover:text-accent focus-visible:outline-offset-4"
                >
                  <Mail className="size-5 shrink-0" aria-hidden />
                  <span className="text-xs font-bold tracking-widest break-all">
                    {CONTACT.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="flex min-h-11 flex-col items-center justify-center gap-2 border border-border bg-surface-elevated p-4 text-center transition-colors hover:border-accent hover:text-accent focus-visible:outline-offset-4"
                >
                  <Phone className="size-5 shrink-0" aria-hidden />
                  <span className="text-xs font-bold tracking-widest">
                    {CONTACT.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 flex-col items-center justify-center gap-2 border border-border bg-surface-elevated p-4 text-center transition-colors hover:border-accent hover:text-accent focus-visible:outline-offset-4"
                >
                  <span className="text-xs font-bold tracking-widest">
                    {t('contact.linkedin')}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    /in/brandon-alan-rodriguez
                  </span>
                </a>
              </li>
            </ul>

            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => e.preventDefault()}
              noValidate
              aria-labelledby="transmissions-heading"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="origin-name"
                    className="text-xs font-bold tracking-widest text-muted-foreground"
                  >
                    {t('contact.form.originName')}
                  </label>
                  <input
                    id="origin-name"
                    name="originName"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder={t('contact.form.originNamePlaceholder')}
                    className="min-h-11 border border-border bg-input px-4 py-3 text-base uppercase text-foreground placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="comms-channel"
                    className="text-xs font-bold tracking-widest text-muted-foreground"
                  >
                    {t('contact.form.commsChannel')}
                  </label>
                  <input
                    id="comms-channel"
                    name="commsChannel"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder={t('contact.form.commsChannelPlaceholder')}
                    className="min-h-11 border border-border bg-input px-4 py-3 text-base uppercase text-foreground placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="signal-content"
                  className="text-xs font-bold tracking-widest text-muted-foreground"
                >
                  {t('contact.form.signalContent')}
                </label>
                <textarea
                  id="signal-content"
                  name="signalContent"
                  rows={5}
                  required
                  placeholder={t('contact.form.signalContentPlaceholder')}
                  className="min-h-32 resize-y border border-border bg-input px-4 py-3 text-base uppercase text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
              <button
                type="submit"
                className="min-h-11 w-full border border-accent py-4 font-display text-2xl uppercase tracking-[0.2em] text-accent shadow-[0_0_15px_rgba(0,163,255,0.3)] transition-colors hover:bg-accent/10 focus-visible:outline-offset-4"
              >
                {t('contact.form.submit')}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer
        className="flex flex-col items-center justify-between gap-6 border-t border-border bg-input px-4 py-6 sm:flex-row sm:px-16"
        data-node-id="2:163"
      >
        <span className="font-display text-2xl">Brandon A. RODRÍGUEZ</span>
        <nav aria-label={t('a11y.footerNav')}>
          <ul className="flex flex-wrap justify-center gap-6">
            {FOOTER_LINK_KEYS.map((item) => (
              <li key={item.labelKey}>
                <a
                  href={item.href}
                  className="inline-flex min-h-6 min-w-6 items-center text-xs font-bold tracking-widest text-muted-foreground hover:text-foreground focus-visible:outline-offset-4"
                >
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-center text-xs font-bold tracking-widest text-muted-foreground sm:text-right">
          {t('footer.copyright')}
        </p>
      </footer>
    </div>
  )
}

export default App
