import type { TFunction } from 'i18next'

export function getStringArray(t: TFunction, key: string): string[] {
  const value = t(key, { returnObjects: true })
  return Array.isArray(value) ? (value as string[]) : []
}

export interface ExperienceItemTranslation {
  title: string
  company: string
  period: string
  description: string
}

export function splitDescriptionLines(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
}

export function getExperienceItems(
  t: TFunction,
): ExperienceItemTranslation[] {
  const value = t('experience.items', { returnObjects: true })
  return Array.isArray(value) ? (value as ExperienceItemTranslation[]) : []
}
