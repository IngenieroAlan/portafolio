import { useTranslation } from 'react-i18next'
import { ContactSection } from '@/components/contact-section'
import { EducationSection } from '@/components/education-section'
import { ExperienceSection } from '@/components/experience-section'
import { GitHubContributionsSection } from '@/components/github-contributions-section'
import { HeroSection } from '@/components/hero-section'
import { ParallaxStarfield } from '@/components/parallax-starfield'
import { ProjectsSection } from '@/components/projects-section'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { SkillsSection } from '@/components/skills-section'
import { WhatsAppFab } from '@/components/whatsapp-fab'

function App() {
  const { t } = useTranslation()

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

      <SiteHeader />

      <main id="main-content" className="pt-20">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <GitHubContributionsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>

      <SiteFooter />

      <WhatsAppFab />
    </div>
  )
}

export default App
