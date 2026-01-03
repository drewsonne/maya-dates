/**
 * Locale identifier for i18n support
 */
export type Locale = string;

/**
 * Translation mapping for a single term
 */
export interface Translation {
  /** Canonical/default spelling */
  canonical: string;
  /** Alternative spellings for this term */
  alternatives: string[];
}

/**
 * Translation registry for Tzolkin day names
 */
export interface TzolkinDayTranslations {
  [dayName: string]: Translation;
}

/**
 * Translation registry for Haab month names
 */
export interface HaabMonthTranslations {
  [monthName: string]: Translation;
}

/**
 * Complete locale definition
 */
export interface LocaleDefinition {
  /** Locale identifier (e.g., 'en-US', 'es-MX') */
  locale: Locale;
  /** Human-readable name */
  name: string;
  /** Tzolkin day name translations */
  tzolkinDays?: TzolkinDayTranslations;
  /** Haab month name translations */
  haabMonths?: HaabMonthTranslations;
}

/**
 * Options for rendering dates with i18n
 */
export interface I18nRenderOptions {
  /** Locale to use for rendering */
  locale?: Locale;
}
