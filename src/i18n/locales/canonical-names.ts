/**
 * Canonical names for Tzolkin days and Haab months.
 * These are the standard transliteration forms used throughout the library.
 * All other spellings are alternatives that map to these canonical forms.
 */

/**
 * Canonical names for the 20 Tzolkin day names in positional order (1-20)
 */
export const TZOLKIN_DAY_NAMES = [
  'Imix',
  'Ik\'',
  'Ak\'bal',
  'K\'an',
  'Chikchan',
  'Kimi',
  'Manik\'',
  'Lamat',
  'Muluk',
  'Ok',
  'Chuwen',
  'Eb',
  'Ben',
  'Ix',
  'Men',
  'Kib',
  'Kaban',
  'Etz\'nab',
  'Kawak',
  'Ajaw'
] as const;

/**
 * Canonical names for the 19 Haab month names in positional order (1-19)
 */
export const HAAB_MONTH_NAMES = [
  'Pop',
  'Wo',
  'Sip',
  'Sotz\'',
  'Sek',
  'Xul',
  'Yaxk\'in',
  'Mol',
  'Ch\'en',
  'Yax',
  'Sak',
  'Keh',
  'Mak',
  'K\'ank\'in',
  'Muwan',
  'Pax',
  'K\'ayab',
  'Kumk\'u',
  'Wayeb'
] as const;
