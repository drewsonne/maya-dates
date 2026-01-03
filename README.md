# @drewsonne/maya-dates

![Documentation Coverage](https://drewsonne.github.io/maya-dates/badge.svg)

A typescript library for interacting with and modifying both the Maya Long Count (LC)
and Calendar Round (CR) dates.

## Table of Contents

- [Node.js Support](#nodejs-support)
- [Quickstart](#quickstart)
- [Instructions](#instructions)
  - [Date Creation](#date-creation)
  - [Operations](#operations)
- [Common Patterns](#common-patterns)
  - [Parsing Maya Dates](#parsing-maya-dates)
  - [Gregorian to Long Count Conversion](#gregorian-to-long-count-conversion)
  - [Working with Wildcards](#working-with-wildcards)
  - [Date Arithmetic](#date-arithmetic)
- [Migration Guide](#migration-guide)
- [Development](#development)
- [Documentation](#documentation)

## Node.js Support

This library supports Node.js versions 20, 22, and 24 (LTS). Development is done on Node 24.

## Quickstart
```sh
npm install @drewsonne/maya-dates
```

```typescript
import { LongCountFactory } from '@drewsonne/maya-dates';

// Long Count from Initial Series on east side of Stele E, Quirigua
const lc = new LongCountFactory().parse('9.17.0.0.0');
console.log(`${lc.buildFullDate()}`);
```
This should print `13 Ajaw 18 Kumk'u  9.17. 0. 0. 0`.

## Instructions

Most implementations will consist of creating a fullDate, and passing it to an operation.

### Date Creation
Creating a fullDate can be done either by:

 - using a factory class (`LongCountFactory`, `CalendarRoundFactory`, `FullDateFactory`)
  and calling its `parse(raw_string)` function, where `raw_string` is a LC, CR,
  or CR and LC combination encoded as a string. To specify missing values in a
  fullDate, using `*`. For example,

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

 - passing explicit values into a model factory or class (`getCalendarRound`,
 `LongCount`, `FullDate`).

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

### Operations
Once a full date object has been created, you can either add an integer to a fullDate
using `shift(number)`, or filling in missing values in wildcards. The
`operations` module provides operators to expand a fullDate with a wildcard into all possible
values for dates matching that wildcard pattern.

<<<<<<< HEAD
## Migration Guide

### Modern Import Syntax

**This version introduces the `exports` field for better encapsulation and tree-shaking support.**

#### Recommended: Named imports from package root
```typescript
import { LongCountFactory, CalendarRoundFactory, FullDateFactory } from "@drewsonne/maya-dates";
```

#### Backwards Compatible (deprecated): Deep imports
```typescript
// ⚠️ DEPRECATED: Still works for backwards compatibility
import LongCountFactory from "@drewsonne/maya-dates/lib/factory/long-count";
import CalendarRoundFactory from "@drewsonne/maya-dates/lib/factory/calendar-round";
```

**Note:** Deep imports via `/lib/*` are supported for backwards compatibility but may be removed in a future major version. Please migrate to named imports from the package root.

### Benefits of Modern Imports
- ✅ Better tree-shaking (smaller bundle sizes)
- ✅ Cleaner, more maintainable code
- ✅ Future-proof for ESM support
- ✅ Consistent with modern npm package standards
=======
## Common Patterns

### Parsing Maya Dates

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

### Gregorian to Long Count Conversion

Convert between Gregorian dates and Maya Long Count:

```typescript
import { LongCount, LongCountFactory } from '@drewsonne/maya-dates';

// Convert from JavaScript Date object
const date = new Date('2012-12-21');
const lc1 = LongCount.fromGregorian(date);
console.log(`Date object = ${lc1}`);
// Output: "Date object = 13. 0. 0. 0. 0"

// Convert from ISO 8601 date string
const lc2 = LongCount.fromGregorian('2012-12-21');
console.log(`ISO 8601 = ${lc2}`);
// Output: "ISO 8601 = 13. 0. 0. 0. 0"

// Also supports ISO 8601 datetime formats
const lc3 = LongCount.fromGregorian('2012-12-21T00:00:00Z');
console.log(`ISO datetime = ${lc3}`);
// Output: "ISO datetime = 13. 0. 0. 0. 0"

// Alternative: Convert from Julian Day Number directly
const lc4 = LongCount.fromJulianDay(2456283);
console.log(`JDN 2456283 = ${lc4}`);
// Output: "JDN 2456283 = 13. 0. 0. 0. 0"

// Convert Long Count to Gregorian (reverse direction)
const lcFactory = new LongCountFactory();
const longCountDate = lcFactory.parse('13.0.0.0.0');
const gregorian = longCountDate.gregorian;
console.log(`Long Count ${longCountDate} = ${gregorian.day}/${gregorian.month}/${gregorian.year} ${gregorian.era}`);
// Output: "Long Count 13. 0. 0. 0. 0 = 21/12/2012 CE"

// Roundtrip conversion example
const original = lcFactory.parse('9.17.0.0.0');
const asGregorian = original.gregorian;
const backToLC = LongCount.fromGregorian(asGregorian);
console.log(`Original: ${original}, Roundtrip: ${backToLC}`);
// Both will be identical: " 9.17. 0. 0. 0"
```

**Available conversion methods:**
- `LongCount.fromGregorian(date | isoString, correlation?)` - Convert from Date object or ISO 8601 string
- `LongCount.fromJulianDay(jdn, correlation?)` - Convert from Julian Day Number
- `LongCount.fromMayanDayNumber(mdn, correlation?)` - Convert from Maya Day Number
- `longCount.gregorian` - Convert Long Count to Gregorian (getter property)
- `longCount.julianDay` - Get Julian Day Number for Long Count (getter property)

### Working with Wildcards

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

### Date Arithmetic

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

## Migration Guide

### Upgrading from v1.x

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
>>>>>>> 7cb1fe3 (Add modern import examples, Common Patterns section, and runnable examples)

## Development

See [docs/WORKFLOW.md](docs/WORKFLOW.md) for the development workflow and contribution guidelines.

### Building
```sh
npm run build          # Compile TypeScript to JavaScript
npm run build:check    # Type check without emitting files
npm run build:docs     # Generate API documentation
```

### Testing
```sh
npm test               # Run all tests
npm run test:coverage  # Run tests with coverage report
```

## Documentation

Full API documentation is generated with **TypeDoc** and published via GitHub Pages.
You can browse the documentation at
[https://drewsonne.github.io/maya-dates/](https://drewsonne.github.io/maya-dates/).

