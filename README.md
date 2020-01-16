# @drewsonne/maya-dates

A library for interacting with and modifying both the Maya Long Count (LC)
and Calendar Round (CR) dates.

# Quickstart
```sh
npm install [-g] @drewsonne/maya-dates
```

```javascript
const mayadates = require('@drewsonne/maya-dates');
// Long Count from Initial Series on east side of Stele E, Quirigua
let lc = new mayadates.factory.LongCountFactory().parse('9.17.0.0.0');
console.log(`${lc.buildFullDate()}`);
```
This should print `13 Ajaw 18 Kumk'u  9.17. 0. 0. 0`.

## Instructions

Most implementations will consist of creating a fullDate, and passing it to an operation.

### Date Creation
Creating a fullDate can be done either by:

 - using a factory class ([LongCountFactory](https://drewsonne.github.io/maya-dates/class/src/factory/long-count.js~LongCountFactory.html),
 [CalendarRoundFactory](https://drewsonne.github.io/maya-dates/class/src/factory/calendar-round.js~CalendarRoundFactory.html),
 [FullDateFactory](https://drewsonne.github.io/maya-dates/class/src/factory/full-date.js~FullDateFactory.html))
 and calling its `parse(raw_string)` function, where `raw_string` is a LC, CR,
 or CR and LC combination encoded as a string. To specify missing values in a
 fullDate, using `*`. For example,

```javascript
const mayadates = require('@drewsonne/maya-dates');

const wildcard = mayadates.wildcard;

const partial_lc = new mayadates.factory.LongCountFactory().parse('9.17.0.0.*');
const partial_cr = new mayadates.factory.CalendarRoundFactory().parse('13 Ajaw * Kumk\'u');
const partial_date = new mayadates.factory.FullDateFactory().parse('13 Ajaw * Kumk\'u 9.17.0.0.*');

console.log(`LC: ${partial_lc.kIn === wildcard}`);
console.log(`CR: ${partial_cr.haab.coeff === wildcard}`);
console.log(`Full Date: ${partial_date.lc.kIn === wildcard}`);
```

 - passing explicit values into a model factory or class ([getCalendarRound](https://drewsonne.github.io/maya-dates/docs/function/index.html#static-function-getCalendarRound),
 [LongCount](https://drewsonne.github.io/maya-dates/class/src/lc/long-count.js~LongCount.html),
 [FullDate](https://drewsonne.github.io/maya-dates/docs/class/src/full-date.js~FullDate.html)).

```javascript
const mayadates = require('@drewsonne/maya-dates');

const cr = mayadates.cr.getCalendarRound(
    13, 'Ajaw',
    18,  mayadates.cr.getHaabMonth('Kumk\'u')
);
const lc = mayadates.lc.LongCount(0, 0, 0, 17, 9);
const fullDate = new mayadates.FullDate(cr, lc);

console.log(`${lc}`);
console.log(`${cr}`);
console.log(`${fullDate}`);
```

### Operations
Once a full date object has been created, you can either add an integer to a fullDate
using `shift(number)`, or filling in missing values in wildcards. The
[`operations`](https://drewsonne.github.io/maya-dates/identifiers.html#operations)
namespace provides operators to expand a fullDate with a wildcard into all possible
values for dates matching that wildcard pattern.

## Documentation

Full documentation and reference can be found at
[https://drewsonne.github.io/maya-dates/](https://drewsonne.github.io/maya-dates/).

