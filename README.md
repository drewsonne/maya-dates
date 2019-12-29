# @drewsonne/maya-dates

A library for interacting with and modifying both the Maya Long Count
and Calendar Round dates.

# Quickstart

```shell script
npm install [-g] @drewsonne/maya-dates
```
```javascript
const mayadates = require('@drewsonne/maya-dates')
// Long Count from Initial Series on east side of Stele E, Quirigua
let lc = new mayadates.factory.LongCountFactory().parse('9.17.0.0.0')
console.log(`${lc.build_full_date()}`)
```
This should print 
