/**
 * Example: Using i18n to support alternative spellings
 * 
 * Run with: npx ts-node examples/i18n.ts
 */

import { 
  CalendarRoundFactory,
  getI18nManager,
  getTzolkinDay,
  getHaabMonth,
  LocaleDefinition
} from '../src/index';

// Get the i18n manager instance
const i18n = getI18nManager();

// Register a locale with alternative spellings (e.g., common variants)
const alternativeSpellings: LocaleDefinition = {
  locale: 'alternative',
  name: 'Alternative Spellings',
  tzolkinDays: {
    'Ajaw': { canonical: 'Ajaw', alternatives: ['Ahau', 'Ajau'] },
    'Imix': { canonical: 'Imix', alternatives: ['Imix\'', 'Imish', 'Imox'] },
    'Ik\'': { canonical: 'Ik\'', alternatives: ['Ik', 'Iq', 'Iq\''] },
    'Ak\'bal': { canonical: 'Ak\'bal', alternatives: ['Akbal', 'Ak-bal', 'Aqabal'] }
  },
  haabMonths: {
    'Kumk\'u': { canonical: 'Kumk\'u', alternatives: ['Kumku', 'Cumku', 'K\'umk\'u'] },
    'Pop': { canonical: 'Pop', alternatives: ['Pop\'', 'Pohp'] },
    'K\'ayab': { canonical: 'K\'ayab', alternatives: ['Kayab', 'K-ayab'] },
    'K\'ank\'in': { canonical: 'K\'ank\'in', alternatives: ['Kankin', 'K-ank-in'] }
  }
};

i18n.registerLocale(alternativeSpellings);

// Register a simplified spelling locale for rendering
const simplifiedSpellings: LocaleDefinition = {
  locale: 'simplified',
  name: 'Simplified Spellings (no apostrophes)',
  tzolkinDays: {
    'Ik\'': { canonical: 'Ik', alternatives: [] },
    'Ak\'bal': { canonical: 'Akbal', alternatives: [] },
    'K\'an': { canonical: 'Kan', alternatives: [] },
    'Manik\'': { canonical: 'Manik', alternatives: [] },
    'Etz\'nab': { canonical: 'Etznab', alternatives: [] }
  },
  haabMonths: {
    'Sotz\'': { canonical: 'Sotz', alternatives: [] },
    'Yaxk\'in': { canonical: 'Yaxkin', alternatives: [] },
    'Ch\'en': { canonical: 'Chen', alternatives: [] },
    'K\'ank\'in': { canonical: 'Kankin', alternatives: [] },
    'K\'ayab': { canonical: 'Kayab', alternatives: [] },
    'Kumk\'u': { canonical: 'Kumku', alternatives: [] }
  }
};

i18n.registerLocale(simplifiedSpellings);

console.log('=== I18n Alternative Spellings Example ===\n');

// Example 1: Parsing with alternative spellings
console.log('Example 1: Parsing alternative spellings');
console.log('------------------------------------------');

const factory = new CalendarRoundFactory();

// Parse the famous Calendar Round using different spellings
const spellings = [
  '4 Ajaw 8 Kumk\'u',   // Standard spelling
  '4 Ahau 8 Kumku',      // Alternative spelling (classic Mayanist)
  '4 Ajau 8 Cumku'       // Another variant
];

spellings.forEach(spelling => {
  const cr = factory.parse(spelling);
  console.log(`Input:  "${spelling}"`);
  console.log(`Output: "${cr.toString()}" (canonical form)`);
  console.log();
});

// Example 2: Rendering in different locales
console.log('Example 2: Rendering with different locales');
console.log('---------------------------------------------');

const tzolkinDay = getTzolkinDay('Ik\'');
const haabMonth = getHaabMonth('K\'ayab');

console.log('Tzolkin day "Ik\'"');
console.log(`  Default:    ${tzolkinDay.toString()}`);
console.log(`  Simplified: ${(tzolkinDay as any).toLocaleString('simplified')}`);
console.log();

console.log('Haab month "K\'ayab"');
console.log(`  Default:    ${haabMonth.toString()}`);
console.log(`  Simplified: ${(haabMonth as any).toLocaleString('simplified')}`);
console.log();

// Example 3: Parsing various alternative forms
console.log('Example 3: Parsing various alternative forms');
console.log('----------------------------------------------');

const alternativeForms = [
  '4 Ahau 8 Kumku',
  '13 Akbal 1 Kankin'
];

alternativeForms.forEach(form => {
  try {
    const cr = factory.parse(form);
    console.log(`"${form}" → "${cr.toString()}"`);
  } catch (error) {
    console.log(`"${form}" → Error: ${(error as Error).message}`);
  }
});
console.log();

// Example 4: Round-trip parsing and rendering
console.log('Example 4: Round-trip with locales');
console.log('------------------------------------');

const crOriginal = factory.parse('13 Akbal 1 Kankin');
console.log(`Parsed (alternative):  "${crOriginal.toString()}"`);

// The system automatically normalized "Akbal" to "Ak'bal" and "Kankin" to "K'ank'in"
console.log(`Day (default):         ${crOriginal.tzolkin.day.toString()}`);
console.log(`Day (simplified):      ${(crOriginal.tzolkin.day as any).toLocaleString('simplified')}`);
console.log(`Month (default):       ${crOriginal.haab.month.toString()}`);
console.log(`Month (simplified):    ${(crOriginal.haab.month as any).toLocaleString('simplified')}`);
console.log();

// Example 5: Listing registered locales
console.log('Example 5: Registered locales');
console.log('------------------------------');
console.log('Available locales:', i18n.getRegisteredLocales().join(', '));
console.log('Active locale:', i18n.getActiveLocale());
console.log();

console.log('=== End of i18n example ===');
