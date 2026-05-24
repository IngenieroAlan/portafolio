import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from '@/locales/en.json'
import es from '@/locales/es.json'

export const SUPPORTED_LANGUAGES = ['es', 'en'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

const STORAGE_KEY = 'portfolio-locale'

function syncDocumentLanguage(lng: string) {
  const lang = lng.startsWith('en') ? 'en' : 'es'
  document.documentElement.lang = lang

  const title = i18n.t('meta.title')
  if (title && title !== 'meta.title') {
    document.title = title
  }

  const description = i18n.t('meta.description')
  const meta = document.querySelector('meta[name="description"]')
  if (meta && description && description !== 'meta.description') {
    meta.setAttribute('content', description)
  }
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    fallbackLng: 'es',
    supportedLngs: [...SUPPORTED_LANGUAGES],
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: STORAGE_KEY,
      caches: ['localStorage'],
      convertDetectedLanguage: (lng: string) =>
        lng.startsWith('en') ? 'en' : 'es',
    },
  })
  .then(() => {
    syncDocumentLanguage(i18n.language)
  })

i18n.on('languageChanged', syncDocumentLanguage)

export default i18n
