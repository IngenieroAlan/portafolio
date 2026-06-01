import { useTranslation } from 'react-i18next'
import { FOOTER_LINK_KEYS } from '@/data/portfolio-structure'

export function SiteFooter() {
  const { t } = useTranslation()

  return (
    <footer
      className="flex flex-col items-center justify-between gap-6 border-t border-border bg-input px-4 py-6 sm:flex-row sm:px-16"
      data-node-id="2:163"
    >
      <span className="font-display text-2xl">BRANDON A. RODRÍGUEZ</span>
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
  )
}
