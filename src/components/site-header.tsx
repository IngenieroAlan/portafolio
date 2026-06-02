import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/language-switcher'
import { MobileNavDrawer } from '@/components/mobile-nav-drawer'
import { NAV_LINK_KEYS } from '@/data/portfolio-structure'

export function SiteHeader() {
  const { t } = useTranslation()

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-accent-glow bg-[rgba(19,19,19,0.8)] px-4 py-4 shadow-[0_4px_12px_rgba(0,163,255,0.3)] backdrop-blur-[6px] sm:px-16"
      data-node-id="2:175"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a
          href="#hero"
          className="font-display text-2xl tracking-[-0.05em] text-accent focus-visible:outline-offset-4"
        >
          BRANDON A. RODRÍGUEZ
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
          <a
            href="#missions"
            className="hidden min-h-6 min-w-24 items-center justify-center border border-foreground px-6 py-2 text-center text-xs font-bold tracking-[0.12em] text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-offset-4 md:inline-flex"
          >
            {t('nav.viewMore')}
          </a>
          <MobileNavDrawer />
        </div>
      </div>
    </header>
  )
}
