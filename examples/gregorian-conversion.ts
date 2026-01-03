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

// Example 2: Convert from JavaScript Date object
console.log('\nExample 2: JavaScript Date → Long Count');
const date = new Date('2012-12-21');
const fromDate = LongCount.fromDate(date);
console.log(`  Date: ${date.toISOString()}`);
console.log(`  Long Count: ${fromDate}`);

// Example 3: Convert from ISO 8601 date string
console.log('\nExample 3: ISO 8601 → Long Count');
const isoDate = '2012-12-21';
const fromISO = LongCount.fromISO8601(isoDate);
console.log(`  ISO 8601: ${isoDate}`);
console.log(`  Long Count: ${fromISO}`);

// Example 4: Convert from ISO 8601 datetime string
console.log('\nExample 4: ISO 8601 DateTime → Long Count');
const isoDateTime = '2012-12-21T00:00:00Z';
const fromISODateTime = LongCount.fromISO8601(isoDateTime);
console.log(`  ISO 8601 DateTime: ${isoDateTime}`);
console.log(`  Long Count: ${fromISODateTime}`);

// Example 5: Convert Long Count to Gregorian
console.log('\nExample 5: Long Count → Gregorian');
const lc = new LongCountFactory().parse('13.0.0.0.0');
const gregorian = lc.gregorian;

console.log(`  Long Count: ${lc}`);
console.log(`  Gregorian: ${gregorian.day}/${gregorian.month}/${gregorian.year} ${gregorian.era}`);
console.log(`  Julian Day: ${gregorian.julianDay}`);

// Example 6: Roundtrip conversion
console.log('\nExample 6: Roundtrip (LC → Gregorian → LC)');
const historicalLc = new LongCountFactory().parse('9.17.0.0.0');
const historicalGregorian = historicalLc.gregorian;
const roundtripLc = LongCount.fromGregorian(historicalGregorian);

console.log(`  Original Long Count: ${historicalLc}`);
console.log(`  As Gregorian: ${historicalGregorian.day}/${historicalGregorian.month}/${historicalGregorian.year} ${historicalGregorian.era}`);
console.log(`  Converted back: ${roundtripLc}`);
console.log(`  Equal? ${historicalLc.equal(roundtripLc)}`);

// Example 7: Using Julian Day Number directly
console.log('\nExample 7: Convert from Julian Day Number');
const jdn = 2456283;
const fromJdn = LongCount.fromJulianDay(jdn);
console.log(`  Julian Day Number: ${jdn}`);
console.log(`  Long Count: ${fromJdn}`);

// Example 8: Using Maya Day Number
console.log('\nExample 8: Convert from Maya Day Number');
const mdn = 1872000; // 13.0.0.0.0
const fromMdn = LongCount.fromMayanDayNumber(mdn);
console.log(`  Maya Day Number: ${mdn}`);
console.log(`  Long Count: ${fromMdn}`);
console.log(`  Bak'tun: ${fromMdn.bakTun}, K'atun: ${fromMdn.kAtun}, Tun: ${fromMdn.tun}, Winal: ${fromMdn.winal}, K'in: ${fromMdn.kIn}`);

