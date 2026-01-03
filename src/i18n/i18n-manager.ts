import {
  Locale,
  LocaleDefinition
} from './types';
import { modern_mayanistLocale } from './locales/modern_mayanist';

/**
 * Default locale identifier
 */
export const DEFAULT_LOCALE: Locale = 'modern-mayanist';

/**
 * Manages internationalization for Maya calendar terms.
 * 
 * Provides a registry for alternative spellings of Tzolkin day names
 * and Haab month names, allowing parsing and rendering in different
 * transliterations.
 * 
 * @example
 * ```typescript
 * import { I18nManager } from '@drewsonne/maya-dates';
 * 
 * const i18n = I18nManager.getInstance();
 * i18n.registerLocale({
 *   locale: 'alt-spelling',
 *   name: 'Alternative Spelling',
 *   tzolkinDays: {
 *     'Imix': { canonical: 'Imix', alternatives: ['Imix\'', 'Imix'] }
 *   }
 * });
 * ```
 */
export class I18nManager {
  private static instance: I18nManager;
  private locales: Map<Locale, LocaleDefinition>;
  private activeLocale: Locale;

  // Reverse lookups for parsing: alternative spelling -> canonical name
  private tzolkinDayLookup: Map<string, string>;
  private haabMonthLookup: Map<string, string>;

  private constructor() {
    this.locales = new Map();
    this.activeLocale = DEFAULT_LOCALE;
    this.tzolkinDayLookup = new Map();
    this.haabMonthLookup = new Map();
    
    // Register the default locale (no translations)
    this.registerDefaultLocale();
  }

  /**
   * Get the singleton instance of I18nManager
   */
  public static getInstance(): I18nManager {
    if (!I18nManager.instance) {
      I18nManager.instance = new I18nManager();
    }
    return I18nManager.instance;
  }

  /**
   * Register the default locale by importing it from the locales folder.
   */
  private registerDefaultLocale(): void {
    this.locales.set(DEFAULT_LOCALE, modern_mayanistLocale);
  }

  /**
   * Register a new locale with its translations
   * 
   * @param localeDefinition - The locale definition to register
   */
  public registerLocale(localeDefinition: LocaleDefinition): void {
    this.locales.set(localeDefinition.locale, localeDefinition);
    this.buildLookupMaps();
  }

  /**
   * Build reverse lookup maps for all registered locales
   * 
   * Note: Currently, alternative spellings are stored in global lookup maps.
   * If multiple locales register the same alternative spelling mapping to
   * different canonical forms, the last registered locale will overwrite
   * previous mappings. Future enhancement will support locale-specific
   * normalization to handle this properly.
   */
  private buildLookupMaps(): void {
    this.tzolkinDayLookup.clear();
    this.haabMonthLookup.clear();

    // Process all locales
    for (const localeDef of Array.from(this.locales.values())) {
      // Process Tzolkin day translations
      if (localeDef.tzolkinDays) {
        for (const [canonical, translation] of Object.entries(localeDef.tzolkinDays)) {
          // Map canonical name to itself
          this.tzolkinDayLookup.set(canonical, canonical);
          
          // Map alternatives to canonical
          if (translation && translation.alternatives) {
            for (const alt of translation.alternatives) {
              this.tzolkinDayLookup.set(alt, canonical);
            }
          }
        }
      }

      // Process Haab month translations
      if (localeDef.haabMonths) {
        for (const [canonical, translation] of Object.entries(localeDef.haabMonths)) {
          // Map canonical name to itself
          this.haabMonthLookup.set(canonical, canonical);
          
          // Map alternatives to canonical
          if (translation && translation.alternatives) {
            for (const alt of translation.alternatives) {
              this.haabMonthLookup.set(alt, canonical);
            }
          }
        }
      }
    }
  }

  /**
   * Set the active locale for rendering
   * 
   * @param locale - The locale to activate
   * @throws Error if locale is not registered
   */
  public setActiveLocale(locale: Locale): void {
    if (!this.locales.has(locale)) {
      throw new Error(`Locale '${locale}' is not registered`);
    }
    this.activeLocale = locale;
  }

  /**
   * Get the active locale
   */
  public getActiveLocale(): Locale {
    return this.activeLocale;
  }

  /**
   * Get all registered locales
   */
  public getRegisteredLocales(): Locale[] {
    return Array.from(this.locales.keys());
  }

  /**
   * Normalize a Tzolkin day name to its canonical form
   * 
   * @param name - The name to normalize (may be alternative spelling)
   * @returns The canonical name, or the input if no mapping exists
   */
  public normalizeTzolkinDay(name: string): string {
    return this.tzolkinDayLookup.get(name) || name;
  }

  /**
   * Normalize a Haab month name to its canonical form
   * 
   * @param name - The name to normalize (may be alternative spelling)
   * @returns The canonical name, or the input if no mapping exists
   */
  public normalizeHaabMonth(name: string): string {
    return this.haabMonthLookup.get(name) || name;
  }

  /**
   * Get the rendering for a Tzolkin day in the specified locale
   * 
   * @param canonicalName - The canonical day name
   * @param locale - The locale to render in (defaults to active locale)
   * @returns The rendered name in the specified locale, or canonical if not found
   */
  public renderTzolkinDay(canonicalName: string, locale?: Locale): string {
    const targetLocale = locale || this.activeLocale;
    const localeDef = this.locales.get(targetLocale);
    
    if (localeDef && localeDef.tzolkinDays && localeDef.tzolkinDays[canonicalName]) {
      return localeDef.tzolkinDays[canonicalName].canonical;
    }
    
    return canonicalName;
  }

  /**
   * Get the rendering for a Haab month in the specified locale
   * 
   * @param canonicalName - The canonical month name
   * @param locale - The locale to render in (defaults to active locale)
   * @returns The rendered name in the specified locale, or canonical if not found
   */
  public renderHaabMonth(canonicalName: string, locale?: Locale): string {
    const targetLocale = locale || this.activeLocale;
    const localeDef = this.locales.get(targetLocale);
    
    if (localeDef && localeDef.haabMonths && localeDef.haabMonths[canonicalName]) {
      return localeDef.haabMonths[canonicalName].canonical;
    }
    
    return canonicalName;
  }

  /**
   * Reset the manager to default state (for testing)
   */
  public reset(): void {
    this.locales.clear();
    this.activeLocale = DEFAULT_LOCALE;
    this.tzolkinDayLookup.clear();
    this.haabMonthLookup.clear();
    this.registerDefaultLocale();
  }
}

/**
 * Get the singleton I18nManager instance
 */
export function getI18nManager(): I18nManager {
  return I18nManager.getInstance();
}
