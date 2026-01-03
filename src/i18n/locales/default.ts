import { LocaleDefinition } from '../types';
import { TZOLKIN_DAY_NAMES, HAAB_MONTH_NAMES } from './canonical-names';

/**
 * Default locale with standard transliteration of Maya calendar terms.
 * This uses the conventional academic transliteration widely used in Maya studies.
 */
export const defaultLocale: LocaleDefinition = {
  locale: 'default',
  name: 'Default (Standard Transliteration)',
  tzolkinDays: Object.fromEntries(
    TZOLKIN_DAY_NAMES.map(name => [name, { canonical: name, alternatives: [] }])
  ),
  haabMonths: Object.fromEntries(
    HAAB_MONTH_NAMES.map(name => [name, { canonical: name, alternatives: [] }])
  )
};
