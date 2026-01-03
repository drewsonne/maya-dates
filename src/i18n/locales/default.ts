import { LocaleDefinition } from '../types';

/**
 * Default locale with standard transliteration of Maya calendar terms.
 * This uses the conventional academic transliteration widely used in Maya studies.
 */
export const defaultLocale: LocaleDefinition = {
  locale: 'default',
  name: 'Default (Standard Transliteration)',
  tzolkinDays: {
    'Imix': { canonical: 'Imix', alternatives: [] },
    'Ik\'': { canonical: 'Ik\'', alternatives: [] },
    'Ak\'bal': { canonical: 'Ak\'bal', alternatives: [] },
    'K\'an': { canonical: 'K\'an', alternatives: [] },
    'Chikchan': { canonical: 'Chikchan', alternatives: [] },
    'Kimi': { canonical: 'Kimi', alternatives: [] },
    'Manik\'': { canonical: 'Manik\'', alternatives: [] },
    'Lamat': { canonical: 'Lamat', alternatives: [] },
    'Muluk': { canonical: 'Muluk', alternatives: [] },
    'Ok': { canonical: 'Ok', alternatives: [] },
    'Chuwen': { canonical: 'Chuwen', alternatives: [] },
    'Eb': { canonical: 'Eb', alternatives: [] },
    'Ben': { canonical: 'Ben', alternatives: [] },
    'Ix': { canonical: 'Ix', alternatives: [] },
    'Men': { canonical: 'Men', alternatives: [] },
    'Kib': { canonical: 'Kib', alternatives: [] },
    'Kaban': { canonical: 'Kaban', alternatives: [] },
    'Etz\'nab': { canonical: 'Etz\'nab', alternatives: [] },
    'Kawak': { canonical: 'Kawak', alternatives: [] },
    'Ajaw': { canonical: 'Ajaw', alternatives: [] }
  },
  haabMonths: {
    'Pop': { canonical: 'Pop', alternatives: [] },
    'Wo': { canonical: 'Wo', alternatives: [] },
    'Sip': { canonical: 'Sip', alternatives: [] },
    'Sotz\'': { canonical: 'Sotz\'', alternatives: [] },
    'Sek': { canonical: 'Sek', alternatives: [] },
    'Xul': { canonical: 'Xul', alternatives: [] },
    'Yaxk\'in': { canonical: 'Yaxk\'in', alternatives: [] },
    'Mol': { canonical: 'Mol', alternatives: [] },
    'Ch\'en': { canonical: 'Ch\'en', alternatives: [] },
    'Yax': { canonical: 'Yax', alternatives: [] },
    'Sak': { canonical: 'Sak', alternatives: [] },
    'Keh': { canonical: 'Keh', alternatives: [] },
    'Mak': { canonical: 'Mak', alternatives: [] },
    'K\'ank\'in': { canonical: 'K\'ank\'in', alternatives: [] },
    'Muwan': { canonical: 'Muwan', alternatives: [] },
    'Pax': { canonical: 'Pax', alternatives: [] },
    'K\'ayab': { canonical: 'K\'ayab', alternatives: [] },
    'Kumk\'u': { canonical: 'Kumk\'u', alternatives: [] },
    'Wayeb': { canonical: 'Wayeb', alternatives: [] }
  }
};
