import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const IMAGES = {
  heroBg: '/images/portfolio/hero-bg.png',
  profile: '/images/portfolio/profile-avatar.png',
  hyperdrive: '/images/portfolio/hyperdrive-engine.png',
  holocron: '/images/portfolio/holocron-archive.png',
  rebel: '/images/portfolio/rebel-data-stream.png',
  iconMissions: '/images/portfolio/icon-missions.png',
  iconArrow: '/images/portfolio/icon-arrow.png',
  iconSystems: '/images/portfolio/icon-systems.png',
  iconJs: '/images/portfolio/icon-js.png',
  iconPython: '/images/portfolio/icon-python.png',
  iconReact: '/images/portfolio/icon-react.png',
  iconAws: '/images/portfolio/icon-aws.png',
  iconDocker: '/images/portfolio/icon-docker.png',
  iconGit: '/images/portfolio/icon-git.png',
  iconExperience: '/images/portfolio/icon-experience.png',
  iconTransmissions: '/images/portfolio/icon-transmissions.png',
} as const

const NAV_LINKS = [
  { href: '#transmissions', label: 'TRANSMISSIONS' },
  { href: '#missions', label: 'ARCHIVES' },
  { href: '#systems', label: 'SYSTEMS' },
  { href: '#transmissions', label: 'CONTACT' },
] as const satisfies ReadonlyArray<{ href: string; label: string }>

const PROJECTS = [
  {
    title: 'HYPERDRIVE ENGINE',
    accent: 'green' as const,
    image: IMAGES.hyperdrive,
    description: [
      'High-performance routing and state',
      'management system built for interstellar',
      'speeds. Reduces load times by 99.9%.',
    ],
    tags: ['REACT', 'NODE.JS'],
  },
  {
    title: 'HOLOCRON ARCHIVE',
    accent: 'coral' as const,
    image: IMAGES.holocron,
    description: [
      'Secure, encrypted database architecture',
      'for ancient and sensitive information.',
      'Features real-time sync across galaxies.',
    ],
    tags: ['FIREBASE', 'NEXT.JS'],
  },
  {
    title: 'REBEL DATA STREAM',
    accent: 'blue' as const,
    image: IMAGES.rebel,
    description: [
      'Real-time WebSocket implementation for',
      'encrypted comms. Evades Imperial',
      'tracking protocols seamlessly.',
    ],
    tags: ['WEBSOCKETS', 'AWS'],
  },
] as const

const SKILLS = [
  { name: 'JAVASCRIPT', icon: IMAGES.iconJs, height: 'h-[9px]' },
  { name: 'PYTHON', icon: IMAGES.iconPython, height: 'h-6' },
  { name: 'REACT', icon: IMAGES.iconReact, height: 'size-[27px]' },
  { name: 'AWS', icon: IMAGES.iconAws, height: 'h-6' },
  { name: 'DOCKER', icon: IMAGES.iconDocker, height: 'size-[30px]' },
  { name: 'GIT', icon: IMAGES.iconGit, height: 'h-[15px]' },
] as const

const EXPERIENCE = [
  {
    side: 'right' as const,
    title: 'SENIOR HOLOCRON ARCHITECT',
    period: '2022 - PRESENT',
    description: [
      'Led the architectural redesign of the main Jedi',
      'Archives, implementing advanced caching',
      'algorithms and real-time holographic sync',
      'protocols.',
    ],
  },
  {
    side: 'left' as const,
    title: 'REBEL SYSTEMS ANALYST',
    period: '2019 - 2022',
    description: [
      'Developed evasive routing software for secure',
      'communication channels, avoiding Imperial',
      'detection mechanisms with 99.9% uptime.',
    ],
  },
  {
    side: 'right' as const,
    title: 'PADAWAN DEVELOPER',
    period: '2017 - 2019',
    description: [
      'Assisted in maintaining legacy systems, learning',
      'the ways of the Force (and modern web',
      'frameworks) under the guidance of Jedi Masters.',
    ],
  },
] as const

const accentStyles = {
  green: {
    title: 'text-neon-green',
    border: 'border-neon-green',
    shadow: 'drop-shadow-[0_0_7.5px_rgba(4,233,6,0.2)]',
    tag: 'border-neon-green text-neon-green',
  },
  coral: {
    title: 'text-neon-coral',
    border: 'border-neon-coral',
    shadow: 'drop-shadow-[0_0_7.5px_rgba(255,111,91,0.2)]',
    tag: 'border-neon-coral text-neon-coral',
  },
  blue: {
    title: 'text-accent-glow',
    border: 'border-accent-glow',
    shadow: 'drop-shadow-[0_0_7.5px_rgba(0,163,255,0.2)]',
    tag: 'border-accent-glow text-accent-glow',
  },
} as const

function SectionHeading({
  icon,
  id,
  children,
  className,
}: {
  icon: string
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <img src={icon} alt="" aria-hidden="true" className="size-6 shrink-0" />
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
  return (
    <div
      className="relative min-h-svh w-full bg-canvas text-foreground"
      data-node-id="2:3"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.05] bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,hsl(0_0%_100%),transparent_70%)]"
      />
      <a
        href="#main-content"
        className="visually-hidden focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:m-0 focus:inline-block focus:h-auto focus:w-auto focus:overflow-visible focus:rounded focus:bg-accent-glow focus:px-4 focus:py-2 focus:text-background focus:[clip:auto] focus:whitespace-normal"
      >
        Skip to main content
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
            JEDI_DEV
          </a>
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <a
                    href={link.href}
                    className="text-xs font-bold tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-offset-4"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <nav
              aria-label="Mobile"
              className="flex gap-3 md:hidden"
            >
              <a
                href="#missions"
                className="text-xs font-bold tracking-widest text-muted-foreground"
              >
                ARCHIVES
              </a>
              <a
                href="#transmissions"
                className="text-xs font-bold tracking-widest text-muted-foreground"
              >
                CONTACT
              </a>
            </nav>
            <a
              href="#missions"
              className="inline-flex min-h-6 min-w-24 items-center justify-center border border-foreground px-6 py-2 text-center text-xs font-bold tracking-[0.12em] text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-offset-4"
            >
              VER MÁS
            </a>
          </div>
        </div>
      </header>

      <main id="main-content" className="pt-20">
        <section
          id="hero"
          className="relative flex min-h-[819px] flex-col items-center justify-center bg-top-left bg-no-repeat px-4 py-24 sm:px-16"
          style={{
            backgroundImage: `url('${IMAGES.heroBg}')`,
            backgroundSize: '417px 417px',
          }}
          aria-labelledby="hero-heading"
          data-node-id="2:7"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative size-56 rounded-full border border-border bg-[#131313] p-2 shadow-[0_0_20px_rgba(0,163,255,0.2)]">
              <div className="relative size-full overflow-hidden rounded-full">
                <img
                  src={IMAGES.profile}
                  alt="Profile portrait"
                  className="size-full object-cover"
                  width={224}
                  height={224}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full bg-white mix-blend-saturation"
                />
              </div>
            </div>
            <h1
              id="hero-heading"
              className="font-display text-4xl uppercase tracking-[0.2em] text-[#e5e2e1] sm:text-[64px] sm:leading-[1.1]"
            >
              FULL STACK DEVELOPER
            </h1>
            <p className="h-7 w-full max-w-[22rem] border-r-2 border-accent text-lg uppercase tracking-[0.18em] text-accent sm:max-w-none sm:whitespace-nowrap">
              NEXT.JS, NODE.JS, REACT NATIVE
            </p>
          </div>
        </section>

        <section
          id="missions"
          className="border-y border-border/30 bg-[hsl(0_0%_5%_/0.5)] px-4 py-20 sm:px-16"
          aria-labelledby="missions-heading"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-12">
            <SectionHeading
              icon={IMAGES.iconMissions}
              id="missions-heading"
              className="text-accent"
            >
              MISSIONS
            </SectionHeading>

            <ul className="grid gap-8 md:grid-cols-3">
              {PROJECTS.map((project) => {
                const styles = accentStyles[project.accent]
                return (
                  <li
                    key={project.title}
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
                      {project.title}
                    </h3>
                    <div className="text-base leading-6 text-muted-foreground">
                      {project.description.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                    <ul className="flex flex-wrap gap-2 border-t border-border/50 pt-4">
                      {project.tags.map((tag) => (
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
                VER MÁS
                <img
                  src={IMAGES.iconArrow}
                  alt=""
                  aria-hidden="true"
                  className="size-4"
                />
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
            <SectionHeading icon={IMAGES.iconSystems} id="systems-heading">
              SYSTEMS
            </SectionHeading>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {SKILLS.map((skill) => (
                <li
                  key={skill.name}
                  className="flex flex-col items-center gap-4 border border-border bg-surface-elevated p-6"
                >
                  <img
                    src={skill.icon}
                    alt=""
                    aria-hidden="true"
                    className={cn('w-auto object-contain', skill.height)}
                  />
                  <span className="text-xs font-bold tracking-widest">
                    {skill.name}
                  </span>
                </li>
              ))}
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
              icon={IMAGES.iconExperience}
              id="experience-heading"
              className="text-accent"
            >
              EXPERIENCE
            </SectionHeading>

            <ol className="relative space-y-12" aria-label="Work experience timeline">
              <div
                className="absolute bottom-0 left-1/2 top-0 w-0.5 -translate-x-1/2 bg-accent-glow shadow-[0_0_10px_#00a3ff]"
                aria-hidden="true"
              />
              {EXPERIENCE.map((item) => (
                <li
                  key={item.title}
                  className={cn(
                    'relative flex',
                    item.side === 'right'
                      ? 'justify-end pl-0 md:pl-[58%]'
                      : 'justify-start pr-0 md:pr-[58%]',
                  )}
                >
                  <article className="w-full max-w-md border border-[#1a1a1a] bg-surface px-6 py-6">
                    <h3 className="font-display text-2xl uppercase tracking-wide">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs font-bold tracking-widest text-accent-glow">
                      {item.period}
                    </p>
                    <div className="mt-2 text-base leading-6 text-muted-foreground">
                      {item.description.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </article>
                  <span
                    className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-glow shadow-[0_0_10px_#00a3ff,0_0_20px_#00a3ff]"
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="transmissions"
          className="border-t border-border/30 bg-[hsl(0_0%_5%_/0.3)] px-4 py-20 sm:px-16 lg:px-64"
          aria-labelledby="transmissions-heading"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-12">
            <SectionHeading
              icon={IMAGES.iconTransmissions}
              id="transmissions-heading"
              className="text-accent"
            >
              TRANSMISSIONS
            </SectionHeading>

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
                    ORIGIN NAME
                  </label>
                  <input
                    id="origin-name"
                    name="originName"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="IDENTIFY YOURSELF"
                    className="min-h-11 border border-border bg-input px-4 py-3 text-base uppercase text-foreground placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="comms-channel"
                    className="text-xs font-bold tracking-widest text-muted-foreground"
                  >
                    COMMS CHANNEL
                  </label>
                  <input
                    id="comms-channel"
                    name="commsChannel"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="ENCRYPTED EMAIL"
                    className="min-h-11 border border-border bg-input px-4 py-3 text-base uppercase text-foreground placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="signal-content"
                  className="text-xs font-bold tracking-widest text-muted-foreground"
                >
                  SIGNAL CONTENT
                </label>
                <textarea
                  id="signal-content"
                  name="signalContent"
                  rows={5}
                  required
                  placeholder="TYPE YOUR MESSAGE HERE..."
                  className="min-h-32 resize-y border border-border bg-input px-4 py-3 text-base uppercase text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
              <button
                type="submit"
                className="min-h-11 w-full border border-accent py-4 font-display text-2xl uppercase tracking-[0.2em] text-accent shadow-[0_0_15px_rgba(0,163,255,0.3)] transition-colors hover:bg-accent/10 focus-visible:outline-offset-4"
              >
                SEND SIGNAL
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer
        className="flex flex-col items-center justify-between gap-6 border-t border-border bg-input px-4 py-6 sm:flex-row sm:px-16"
        data-node-id="2:163"
      >
        <span className="font-display text-2xl">JEDI_DEV</span>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-6">
            {(
              [
                { label: 'TERMINAL', href: '#hero' },
                { label: 'ENCRYPTION', href: '#transmissions' },
                { label: 'LOGS', href: '#experience' },
              ] as const
            ).map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="inline-flex min-h-6 min-w-6 items-center text-xs font-bold tracking-widest text-muted-foreground hover:text-foreground focus-visible:outline-offset-4"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-center text-xs font-bold tracking-widest text-muted-foreground sm:text-right">
          © 7977 BBY GALACTIC PORTFOLIO. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  )
}

export default App
