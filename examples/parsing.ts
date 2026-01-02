/**
 * Example: Parsing Maya Dates
 * 
 * Run with: npx ts-node examples/parsing.ts
 */

import { 
  LongCountFactory, 
  CalendarRoundFactory, 
  FullDateFactory 
} from '../src/index';

// Parse a Long Count date
const lcFactory = new LongCountFactory();
const longCount = lcFactory.parse('9.17.0.0.0');

// Parse a Calendar Round date
const crFactory = new CalendarRoundFactory();
const calendarRound = crFactory.parse('13 Ajaw 18 Kumk\'u');

// Parse a Full Date (Calendar Round + Long Count)
const fdFactory = new FullDateFactory();
const fullDate = fdFactory.parse('13 Ajaw 18 Kumk\'u 9.17.0.0.0');

console.log(`Long Count: ${longCount}`);
console.log(`Calendar Round: ${calendarRound}`);
console.log(`Full Date: ${fullDate}`);
