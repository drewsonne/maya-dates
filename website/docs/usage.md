---
sidebar_position: 2
---

# Usage Guide

This guide covers common patterns for working with Maya dates.

## Date Creation

Creating a fullDate can be done either by:

### Using Factory Classes

Use factory classes (`LongCountFactory`, `CalendarRoundFactory`, `FullDateFactory`) and call their `parse(raw_string)` function, where `raw_string` is a LC, CR, or CR and LC combination encoded as a string. To specify missing values in a fullDate, use `*`.

```typescript
import { 
  Wildcard, 
  isWildcard,
  LongCountFactory,
  CalendarRoundFactory,
  FullDateFactory
} from '@drewsonne/maya-dates';

const wildcard = new Wildcard();

const partial_lc = new LongCountFactory().parse('9.17.0.0.*');
const partial_cr = new CalendarRoundFactory().parse('13 Ajaw * Kumk\'u');
const partial_date = new FullDateFactory().parse('13 Ajaw * Kumk\'u 9.17.0.0.*');

console.log(`LC: ${isWildcard(partial_lc.kIn)}`);
console.log(`CR: ${isWildcard(partial_cr.haab.coeff)}`);
console.log(`Full Date: ${isWildcard(partial_date.lc.kIn)}`);
```

### Using Model Constructors

Pass explicit values into a model factory or class (`getCalendarRound`, `LongCount`, `FullDate`):

```typescript
import {
  getCalendarRound,
  getHaab,
  getTzolkin,
  getHaabMonth,
  getTzolkinDay,
  coefficientParser as _,
  FullDate,
  LongCount
} from '@drewsonne/maya-dates';

const calendarRound = getCalendarRound(
    getTzolkin(_(13), getTzolkinDay('Ajaw')),
    getHaab(_(18), getHaabMonth('Kumk\'u'))
);
const lc = new LongCount(0, 0, 0, 17, 9);
const fullDate = new FullDate(calendarRound, lc);

console.log(`${lc}`);
console.log(`${calendarRound}`);
console.log(`${fullDate}`);
```

## Operations

Once a full date object has been created, you can either add an integer to a fullDate using `shift(number)`, or fill in missing values in wildcards. The `operations` module provides operators to expand a fullDate with a wildcard into all possible values for dates matching that wildcard pattern.

## Parsing Maya Dates

Parse different Maya date formats:

```typescript
import { 
  LongCountFactory, 
  CalendarRoundFactory, 
  FullDateFactory 
} from '@drewsonne/maya-dates';

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
```

## Gregorian to Long Count Conversion

Convert Gregorian dates to Maya Long Count:

```typescript
import { GregorianFactory } from '@drewsonne/maya-dates';

// Create a Gregorian date
const gregorianFactory = new GregorianFactory();
const gregorianDate = gregorianFactory.parse('21/12/2012 CE');

// The Gregorian date is internally stored as a Julian Day Number
// which can be used to calculate the corresponding Long Count
console.log(`Julian Day: ${gregorianDate.julianDay}`);
console.log(`Date: ${gregorianDate.day}/${gregorianDate.month}/${gregorianDate.year} ${gregorianDate.era}`);

// You can also convert a Long Count to Gregorian
import { LongCountFactory } from '@drewsonne/maya-dates';

const lc = new LongCountFactory().parse('13.0.0.0.0');
const gregorian = lc.gregorian;
console.log(`Long Count 13.0.0.0.0 corresponds to:`);
console.log(`${gregorian.day}/${gregorian.month}/${gregorian.year} ${gregorian.era}`);
```

## Working with Wildcards

Use wildcards to represent partial or unknown dates:

```typescript
import { 
  LongCountFactory, 
  isWildcard,
  LongCountWildcard 
} from '@drewsonne/maya-dates';

// Create a partial date with a wildcard
const partialLc = new LongCountFactory().parse('9.17.0.0.*');

// Check if a component is a wildcard
if (isWildcard(partialLc.kIn)) {
  console.log('The k\'in position is a wildcard');
}

// Expand wildcards to get all possible dates
const wildcard = new LongCountWildcard(partialLc);
const allDates = wildcard.run();
console.log(`Found ${allDates.length} possible dates`);
```

## Date Arithmetic

Perform arithmetic operations on Maya dates:

```typescript
import { LongCountFactory, LongCount, DistanceNumber } from '@drewsonne/maya-dates';

const lc = new LongCountFactory().parse('9.17.0.0.0');

// Add days using plus() with a DistanceNumber
const oneDay = new DistanceNumber(1);
const nextDate = lc.plus(LongCount.fromDistanceNumber(oneDay)).equals();
console.log(`Next day: ${nextDate}`);

// Add multiple days
const manyDays = new DistanceNumber(365);
const futureDate = lc.plus(LongCount.fromDistanceNumber(manyDays)).equals();
console.log(`365 days later: ${futureDate}`);

// Subtract days using minus()
const hundredDays = new DistanceNumber(100);
const pastDate = lc.minus(LongCount.fromDistanceNumber(hundredDays)).equals();
console.log(`100 days earlier: ${pastDate}`);

// Get the full Calendar Round for a Long Count
const fullDate = lc.buildFullDate();
console.log(`Full date: ${fullDate}`);

// Shift Calendar Round dates
const shifted = fullDate.cr.shift(20);
console.log(`Calendar Round shifted by 20 days: ${shifted}`);
```

## Migration from v1.x

If you're upgrading from version 1.x, you'll need to update your import statements.

**Before (v1.x):**
```typescript
import LongCountFactory from "@drewsonne/maya-dates/lib/factory/long-count";
import {Wildcard, isWildcard} from "@drewsonne/maya-dates/lib/wildcard";
import {getCalendarRound} from "@drewsonne/maya-dates/lib/cr/calendar-round";
```

**After (v2.x):**
```typescript
import { 
  LongCountFactory, 
  Wildcard, 
  isWildcard,
  getCalendarRound 
} from '@drewsonne/maya-dates';
```

**Key Changes:**
- All exports are now available from the package root (`@drewsonne/maya-dates`)
- No need to specify `/lib/` paths or know internal directory structure
- Factory classes are now named exports instead of default exports
- All class and function exports use named exports for better tree-shaking

**Migration Steps:**
1. Replace all `/lib/...` imports with root-level imports
2. Change default imports to named imports for factory classes
3. Group related imports together in a single import statement
4. Test your code to ensure all imports resolve correctly
