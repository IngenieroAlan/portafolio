import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { SupportedLanguage } from '@/i18n'
import { SUPPORTED_LANGUAGES } from '@/i18n'
import { cn } from '@/lib/utils'

const LOCALE_LABELS: Record<SupportedLanguage, string> = {
  es: 'ES',
  en: 'EN',
}

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const current: SupportedLanguage = (
    i18n.resolvedLanguage ?? i18n.language
  ).startsWith('en')
    ? 'en'
    : 'es'

  return (
    <div className="relative">
      <label htmlFor="language-select" className="visually-hidden">
        {t('a11y.languageSwitcher')}
      </label>
      <select
        id="language-select"
        value={current}
        onChange={(e) => void i18n.changeLanguage(e.target.value)}
        className={cn(
          'min-h-6 min-w-[3.25rem] cursor-pointer appearance-none border border-border bg-[rgba(19,19,19,0.9)] py-1 pr-7 pl-2 text-xs font-bold tracking-widest text-foreground',
          'transition-colors hover:border-foreground focus-visible:border-accent focus-visible:outline-offset-4',
        )}
      >
        {SUPPORTED_LANGUAGES.map((lng) => (
          <option key={lng} value={lng}>
            {LOCALE_LABELS[lng]}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-1.5 size-3.5 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
    </div>
  )
}
