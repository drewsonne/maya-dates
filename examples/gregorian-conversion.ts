/**
 * Example: Gregorian to Long Count Conversion
 * 
 * Run with: npx ts-node examples/gregorian-conversion.ts
 */

import { GregorianFactory, LongCountFactory } from '../src/index';

// Create a Gregorian date for the alleged "end of the world" date
const gregorianFactory = new GregorianFactory();
const gregorianDate = gregorianFactory.parse('21/12/2012 CE');

console.log('Gregorian to Julian Day:');
console.log(`  Julian Day: ${gregorianDate.julianDay}`);
console.log(`  Date: ${gregorianDate.day}/${gregorianDate.month}/${gregorianDate.year} ${gregorianDate.era}`);

// Convert a Long Count to Gregorian
const lc = new LongCountFactory().parse('13.0.0.0.0');
const gregorian = lc.gregorian;

console.log('\nLong Count to Gregorian:');
console.log(`  Long Count: ${lc}`);
console.log(`  Gregorian: ${gregorian.day}/${gregorian.month}/${gregorian.year} ${gregorian.era}`);

// Another example: historical date
const historicalLc = new LongCountFactory().parse('9.17.0.0.0');
const historicalGregorian = historicalLc.gregorian;

console.log('\nHistorical Example (Stele E, Quirigua):');
console.log(`  Long Count: ${historicalLc}`);
console.log(`  Gregorian: ${historicalGregorian.day}/${historicalGregorian.month}/${historicalGregorian.year} ${historicalGregorian.era}`);
