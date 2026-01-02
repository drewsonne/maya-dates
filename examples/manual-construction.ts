/**
 * Example: Manual Date Construction
 * 
 * Run with: npx ts-node examples/manual-construction.ts
 */

import {
  getCalendarRound,
  getHaab,
  getTzolkin,
  getHaabMonth,
  getTzolkinDay,
  coefficientParser as _,
  FullDate,
  LongCount
} from '../src/index';

console.log('Manual Date Construction:');

// Build a Calendar Round manually
const calendarRound = getCalendarRound(
  getTzolkin(_(13), getTzolkinDay('Ajaw')),
  getHaab(_(18), getHaabMonth('Kumk\'u'))
);

console.log(`  Calendar Round: ${calendarRound}`);

// Build a Long Count manually (k'in, winal, tun, k'atun, bak'tun)
const lc = new LongCount(0, 0, 0, 17, 9);
console.log(`  Long Count: ${lc}`);

// Combine them into a Full Date
const fullDate = new FullDate(calendarRound, lc);
console.log(`\n  Full Date: ${fullDate}`);
