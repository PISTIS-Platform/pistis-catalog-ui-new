import type { MaybeRefOrGetter } from 'vue'
import { toValue } from '@vueuse/core'
import dayjs from 'dayjs'

/**
 * Returns the representative locale from the given candidates based on the priority list.
 * If none of the locales in the priority list are found in the candidates, the first candidate is returned.
 * @returns The representative locale.
 *
 * @example
 * ```ts
 * const candidates = ['en-US', 'en-GB', 'en']
 * const preferredLocale = ['en-GB', 'en-US']
 * const representativeLocale = getRepresentativeLocaleOf({ candidates, preferredLocale })
 * console.log(representativeLocale) // 'en-GB'
 * ```
 */
export function getRepresentativeLocaleOf({
  candidates = [],
  preferredLocale = [],
}: {
  candidates: string[]
  preferredLocale?: string | string[] | null
}) {
  if (candidates.length === 0)
    return ''
  if (!preferredLocale || preferredLocale.length === 0)
    return candidates[0]

  const priorityListArray = Array.isArray(preferredLocale) ? preferredLocale : [preferredLocale]
  for (const locale of priorityListArray) {
    if (candidates.includes(locale))
      return locale
  }
  return candidates[0]
}

export function getTranslationFor(obj?: Record<string, string> | null, preferredLocale?: string | string[] | null) {
  if (!obj)
    return ''
  const locale = getRepresentativeLocaleOf({ candidates: Object.keys(obj), preferredLocale })
  return obj[locale]
}

export function getLocalizedValue({
  obj,
  fallbackLocale,
}: {
  obj?: Record<string, string> | null
  fallbackLocale: MaybeRefOrGetter<string>
}) {
  const localizedValue = getTranslationFor(obj, toValue(fallbackLocale))
  return localizedValue || obj?.[toValue(fallbackLocale)] || ''
}

export const DATE_FORMAT = 'DD.MM.YYYY' as const

/**
 * Formats to dd.mm.yyyy format
 */
export function formatDatetime(datetime: string) {
  // Format as DD.MM.YYYY, e.g. 11.03.2024
  return dayjs(datetime).format(DATE_FORMAT)
}
