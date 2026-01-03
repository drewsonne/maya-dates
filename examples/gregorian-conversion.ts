/**
 * Example: Gregorian to Long Count Conversion
 * 
 * Run with: npx ts-node examples/gregorian-conversion.ts
 */

import { LongCountFactory, LongCount } from '../src/index';

console.log('=== Gregorian to Long Count Conversion Examples ===\n');

// Example 1: Convert from JavaScript Date object
console.log('Example 1: JavaScript Date → Long Count');
const date = new Date('2012-12-21');
const fromDate = LongCount.fromGregorian(date);
console.log(`  Date: ${date.toISOString()}`);
console.log(`  Long Count: ${fromDate}`);

// Example 2: Convert from ISO 8601 date string
console.log('\nExample 2: ISO 8601 → Long Count');
const isoDate = '2012-12-21';
const fromISO = LongCount.fromGregorian(isoDate);
console.log(`  ISO 8601: ${isoDate}`);
console.log(`  Long Count: ${fromISO}`);

// Example 3: Convert from ISO 8601 datetime string
console.log('\nExample 3: ISO 8601 DateTime → Long Count');
const isoDateTime = '2012-12-21T00:00:00Z';
const fromISODateTime = LongCount.fromGregorian(isoDateTime);
console.log(`  ISO 8601 DateTime: ${isoDateTime}`);
console.log(`  Long Count: ${fromISODateTime}`);

// Example 4: Convert Long Count to Gregorian
console.log('\nExample 4: Long Count → Gregorian');
const lc = new LongCountFactory().parse('13.0.0.0.0');
const gregorian = lc.gregorian;

console.log(`  Long Count: ${lc}`);
console.log(`  Gregorian: ${gregorian.day}/${gregorian.month}/${gregorian.year} ${gregorian.era}`);
console.log(`  Julian Day: ${gregorian.julianDay}`);

// Example 5: Roundtrip conversion with Date object
console.log('\nExample 5: Roundtrip (Date → LC → Gregorian)');
const originalDate = new Date('2012-12-21');
const lcFromDate = LongCount.fromGregorian(originalDate);
const gregorianFromLC = lcFromDate.gregorian;

console.log(`  Original Date: ${originalDate.toISOString()}`);
console.log(`  Long Count: ${lcFromDate}`);
console.log(`  Back to Gregorian: ${gregorianFromLC.day}/${gregorianFromLC.month}/${gregorianFromLC.year} ${gregorianFromLC.era}`);

// Example 6: Roundtrip conversion with ISO string
console.log('\nExample 6: Roundtrip (ISO → LC → Gregorian)');
const isoString = '2012-12-21';
const lcFromISO = LongCount.fromGregorian(isoString);
const gregorianFromISO = lcFromISO.gregorian;

console.log(`  Original ISO: ${isoString}`);
console.log(`  Long Count: ${lcFromISO}`);
console.log(`  Back to Gregorian: ${gregorianFromISO.day}/${gregorianFromISO.month}/${gregorianFromISO.year} ${gregorianFromISO.era}`);

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

