# @drewsonne/maya-dates

![Documentation Coverage](https://drewsonne.github.io/maya-dates/badge.svg)

A typescript library for interacting with and modifying both the Maya Long Count (LC)
and Calendar Round (CR) dates.

## Node.js Support

This library supports Node.js versions 20, 22, and 24 (LTS). Development is done on Node 24.

## Quickstart
```sh
npm install @drewsonne/maya-dates
```

```typescript
import LongCountFactory from "@drewsonne/maya-dates/lib/factory/long-count";
// Long Count from Initial Series on east side of Stele E, Quirigua
let lc = new LongCountFactory().parse('9.17.0.0.0');
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
import {Wildcard, isWildcard} from "@drewsonne/maya-dates/lib/wildcard"
import LongCountFactory from "@drewsonne/maya-dates/lib/factory/long-count";
import CalendarRoundFactory from "@drewsonne/maya-dates/lib/factory/calendar-round";
import FullDateFactory from "@drewsonne/maya-dates/lib/factory/full-date";

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

```javascript
import {getCalendarRound} from "@drewsonne/maya-dates/lib/cr/calendar-round";
import {getHaab} from "@drewsonne/maya-dates/lib/cr/haab";
import {getTzolkin} from "@drewsonne/maya-dates/lib/cr/tzolkin";
import {getHaabMonth} from "@drewsonne/maya-dates/lib/cr/component/haabMonth";
import {getTzolkinDay} from "@drewsonne/maya-dates/lib/cr/component/tzolkinDay";
import {coefficientParser as _} from "@drewsonne/maya-dates/lib/cr/component/coefficient"

import {FullDate} from "@drewsonne/maya-dates/lib/full-date"
import {LongCount} from "@drewsonne/maya-dates/lib/lc/long-count"

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

