/**
 * Example: Date Arithmetic
 * 
 * Run with: npx ts-node examples/arithmetic.ts
 */

import { LongCountFactory, LongCount, DistanceNumber } from '../src/index';

const lc = new LongCountFactory().parse('9.17.0.0.0');

console.log('Date Arithmetic:');
console.log(`  Starting Long Count: ${lc}`);

// Add days using plus() with a DistanceNumber
const oneDay = new DistanceNumber(1);
const nextDate = lc.plus(LongCount.fromDistanceNumber(oneDay)).equals();
console.log(`\n  Next day (+1): ${nextDate}`);

// Add multiple days
const manyDays = new DistanceNumber(365);
const futureDate = lc.plus(LongCount.fromDistanceNumber(manyDays)).equals();
console.log(`  365 days later: ${futureDate}`);

// Subtract days using minus()
const hundredDays = new DistanceNumber(100);
const pastDate = lc.minus(LongCount.fromDistanceNumber(hundredDays)).equals();
console.log(`  100 days earlier: ${pastDate}`);

// Get the full Calendar Round for a Long Count
const fullDate = lc.buildFullDate();
console.log(`\n  Full date with Calendar Round:`);
console.log(`  ${fullDate}`);

// You can also shift the Calendar Round
const shifted = fullDate.cr.shift(20);
console.log(`\n  Calendar Round shifted by 20 days: ${shifted}`);
