/**
 * Example: Gregorian to Long Count Conversion
 * 
 * Run with: npx ts-node examples/gregorian-conversion.ts
 */

import { GregorianFactory, LongCountFactory, LongCount } from '../src/index';

console.log('=== Gregorian to Long Count Conversion Examples ===\n');

// Example 1: Parse Gregorian and convert to Long Count
console.log('Example 1: Gregorian → Long Count');
const gregorianFactory = new GregorianFactory();
const gregorianDate = gregorianFactory.parse('21/12/2012 CE');

console.log(`  Gregorian date: ${gregorianDate.day}/${gregorianDate.month}/${gregorianDate.year} ${gregorianDate.era}`);
console.log(`  Julian Day: ${gregorianDate.julianDay}`);

const longCount = LongCount.fromGregorian(gregorianDate);
console.log(`  Long Count: ${longCount}`);

// Example 2: Convert Long Count to Gregorian
console.log('\nExample 2: Long Count → Gregorian');
const lc = new LongCountFactory().parse('13.0.0.0.0');
const gregorian = lc.gregorian;

console.log(`  Long Count: ${lc}`);
console.log(`  Gregorian: ${gregorian.day}/${gregorian.month}/${gregorian.year} ${gregorian.era}`);
console.log(`  Julian Day: ${gregorian.julianDay}`);

// Example 3: Roundtrip conversion
console.log('\nExample 3: Roundtrip (LC → Gregorian → LC)');
const historicalLc = new LongCountFactory().parse('9.17.0.0.0');
const historicalGregorian = historicalLc.gregorian;
const roundtripLc = LongCount.fromGregorian(historicalGregorian);

console.log(`  Original Long Count: ${historicalLc}`);
console.log(`  As Gregorian: ${historicalGregorian.day}/${historicalGregorian.month}/${historicalGregorian.year} ${historicalGregorian.era}`);
console.log(`  Converted back: ${roundtripLc}`);
console.log(`  Equal? ${historicalLc.equal(roundtripLc)}`);

// Example 4: Using Julian Day Number directly
console.log('\nExample 4: Convert from Julian Day Number');
const jdn = 2456283;
const fromJdn = LongCount.fromJulianDay(jdn);
console.log(`  Julian Day Number: ${jdn}`);
console.log(`  Long Count: ${fromJdn}`);

// Example 5: Using Maya Day Number
console.log('\nExample 5: Convert from Maya Day Number');
const mdn = 1872000; // 13.0.0.0.0
const fromMdn = LongCount.fromMayanDayNumber(mdn);
console.log(`  Maya Day Number: ${mdn}`);
console.log(`  Long Count: ${fromMdn}`);
console.log(`  Bak'tun: ${fromMdn.bakTun}, K'atun: ${fromMdn.kAtun}, Tun: ${fromMdn.tun}, Winal: ${fromMdn.winal}, K'in: ${fromMdn.kIn}`);

