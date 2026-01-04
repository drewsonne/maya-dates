# Domain Model: Western Calendar Systems (Julian, Gregorian, and Day Counts)

This document describes the Western date systems that typically sit underneath Maya-calendar conversion: the **Julian calendar**, the **Gregorian calendar**, and continuous day counts such as **Julian Day Number (JDN)**. The focus is on the parts that change outcomes: leap-year rules, cutovers, proleptic usage, year numbering, and day-boundary conventions.

## Overview

A typical conversion pipeline is:

```
Western civil date (Julian or Gregorian)
        ↓
Continuous day index (e.g., JDN or “days since epoch”)
        ↓
Maya day count / cycles (Long Count, Tzolkin, Haab)
```

Once a date is reduced to a single integer day index, the Maya side is deterministic modular arithmetic. Most real-world bugs originate on the Western side: “which calendar rules apply to this civil date?” and “what is a ‘day’ boundary for the day index?”.

---

## The Julian Calendar

### Structure

The Julian calendar uses the familiar 12-month structure and month lengths (28–31 days). ([Wikipedia][1])

### Leap years

Every year divisible by 4 is a leap year (no exceptions). ([Wikipedia][1])

### Consequence

Julian years average **365.25** days. Over centuries this accumulates drift relative to the solar year, which is why the Gregorian reform was introduced. ([Wikipedia][1])

---

## The Gregorian Calendar

### Structure

The Gregorian calendar keeps the same month structure, but changes leap-year selection to reduce long-term drift. ([Wikipedia][2])

### Leap years

Rule summary:

* divisible by 4 → leap year
* divisible by 100 → not a leap year
* divisible by 400 → leap year after all ([Wikipedia][3])

So, for example: 1700/1800/1900 are **not** leap years in Gregorian, while 1600 and 2000 **are**. ([Wikipedia][3])

### Summary table

| Topic                      | Julian                                 | Gregorian                                                   |
| -------------------------- | -------------------------------------- | ----------------------------------------------------------- |
| Leap-year pattern          | divisible by 4 → leap ([Wikipedia][1]) | 4/100/400 rule ([Wikipedia][3])                             |
| Century years (e.g., 1900) | leap ([Wikipedia][1])                  | usually not leap (unless divisible by 400) ([Wikipedia][3]) |
| Average year length        | 365.25 ([Wikipedia][1])                | 365.2425 ([Wikipedia][3])                                   |

---

## The 1582 reform and “missing dates”

When the Gregorian reform was first implemented in some countries, **10 dates were dropped**: **Thursday 4 October 1582** was followed by **Friday 15 October 1582** (in adopting regions). ([Wikipedia][2])

This matters because it creates a policy choice for a “historical cutover” model:

* treat the skipped civil dates as **invalid/nonexistent**, or
* do not model the discontinuity and instead use a proleptic system.

---

## Adoption was not universal (cutovers vary)

The cutover did not happen everywhere at once. The same written civil date can refer to different absolute days depending on the jurisdiction and when it adopted the reform, and historical sources may use “Old Style” (Julian) vs “New Style” (Gregorian) to disambiguate. ([Wikipedia][1])

If jurisdiction is not modeled, a library should avoid claiming “the” historical cutover for all dates/places.

---

## Proleptic Gregorian vs historical usage

### Proleptic Gregorian

A **proleptic Gregorian** calendar applies Gregorian rules backward before 15 October 1582, producing a single consistent arithmetic system without missing dates. ([Wikipedia][4])

ISO 8601 uses the Gregorian calendar and notes that pre-1582 values (and year 0000–1582 in general) are only to be used by mutual agreement in interchange. ([Wikipedia][5])

### Historical (cutover) Gregorian

A historical model applies Julian rules before a chosen cutover and Gregorian after, and may contain invalid civil dates in the gap created by the reform (depending on the cutover adopted). ([Wikipedia][2])

---

## The Julian–Gregorian day offset

Because Julian keeps leap days that Gregorian omits (century years not divisible by 400), the calendars diverge by whole days. The difference changes after February in certain century years.

A standard conversion table (Gregorian range vs Julian range) is: ([Wikipedia][2])

| Gregorian range           | Julian range              | Difference |
| ------------------------- | ------------------------- | ---------: |
| 15 Oct 1582 → 28 Feb 1700 | 5 Oct 1582 → 18 Feb 1700  |    10 days |
| 1 Mar 1700 → 28 Feb 1800  | 19 Feb 1700 → 17 Feb 1800 |    11 days |
| 1 Mar 1800 → 28 Feb 1900  | 18 Feb 1800 → 16 Feb 1900 |    12 days |
| 1 Mar 1900 → 28 Feb 2100  | 17 Feb 1900 → 15 Feb 2100 |    13 days |
| 1 Mar 2100 → 28 Feb 2200  | 16 Feb 2100 → 14 Feb 2200 |    14 days |

A useful sanity check: for events during **1901–2099**, the Julian calendar date is **13 days behind** the corresponding Gregorian date. ([Wikipedia][1])
The discrepancy is commonly stated as **13 days “today”**, becoming **14 days in 2100**. ([Encyclopedia Britannica][6])

---

## Julian Day Number (JDN) and the day boundary problem

### What JDN is

Julian Day Number is a continuous day count used heavily in calendrical conversion. A common definition assigns **JDN 0** to the day starting at **noon Universal Time** on **1 Jan 4713 BC** (proleptic Julian calendar). ([Wikipedia][7])

### Why it matters

Civil calendars normally treat days as starting at **midnight**. JDN’s day boundary at **noon** means that a “whole-day” JDN integer does not naturally align with a civil-date midnight boundary unless you define a mapping rule. ([Wikipedia][7])

If a conversion algorithm mixes these conventions (or truncates at the wrong step), it can introduce a systematic ±1 day error before the Maya math even begins.

---

## Year numbering and “year 0”

There are two common conventions:

* historical BCE/CE numbering has **no year 0**
* ISO 8601 uses a four-digit year and defines **year 0000 = 1 BC**, aligned with astronomical year numbering ([Wikipedia][5])

ISO 8601 also notes that values in **0000–1582** are only to be used by mutual agreement in interchange. ([Wikipedia][5])

If BCE dates are supported, the year-numbering convention is a first-class part of the domain.

---

## How these choices affect Maya conversions

Julian vs Gregorian choices matter only at the boundary where a Western civil date is mapped to an absolute day index (and back). Once the absolute day index is correct, Maya computations (Long Count arithmetic; Tzolkin and Haab stepping) are fixed.

A one-day error at the Western boundary produces:

* Long Count shifted by exactly one day (with carries)
* Tzolkin advanced by one position
* Haab advanced by one position

This is why “just 10–13 days of calendar mismatch” shows up as completely different Maya day names and month positions.

---

## Domain invariants

These are the invariants that must be true for a Western date to be usable in a conversion library (and for results to be interpretable).

A Western civil date is not fully defined without:

* an explicit calendar system: **Julian** vs **Gregorian** (leap-year rules differ) ([Wikipedia][1])
* a Gregorian policy: **proleptic** vs **historical cutover** (and if cutover: which cutover rule/date) ([Wikipedia][4])
* a year-numbering convention for BCE handling: historical BCE/CE (no year 0) vs ISO/astronomical (year 0000 exists) ([Wikipedia][5])

A continuous day index is not fully defined without:

* a day boundary convention: midnight-based civil days vs noon-based Julian Day (and an explicit mapping between them if both are used) ([Wikipedia][7])
* a specified rounding/truncation rule when converting between (civil date, optional time-of-day) and (day number, optional fractional day)

A “historical” Gregorian conversion is not meaningful without:

* a jurisdiction or explicit cutover selection, because adoption timing varies and historical sources may use Old Style/New Style dates ([Wikipedia][1])

A Maya result is only comparable across implementations if:

* the same absolute-day convention and the same correlation/epoch assumptions are used (even with identical Maya math, differing Western normalization shifts outputs)

---

## Appendix: edge cases to include in test suites

These are concrete inputs chosen to flush out the most common Western-calendar bugs before they show up as “wrong Maya dates”.

### Leap-year rule disagreements (Julian vs Gregorian)

Dates that exist in one calendar but not the other:

* `1900-02-29`

  * **Julian**: valid (1900 divisible by 4) ([Wikipedia][1])
  * **Gregorian**: invalid (century year not divisible by 400) ([Wikipedia][3])
* `2000-02-29`

  * **Gregorian**: valid (divisible by 400) ([Wikipedia][3])

### Offset step boundaries (the “March 1” trap)

Dates right around where the Julian–Gregorian difference changes:

* `1700-02-28` vs `1700-03-01`
* `1800-02-28` vs `1800-03-01`
* `1900-02-28` vs `1900-03-01`
* `2100-02-28` vs `2100-03-01`

These are exactly where the difference table changes from 10→11→12→13→14 days. ([Wikipedia][2])

A minimal “known mapping” check:

* In the **1900–2099** era, confirm the conversion aligns with a **13-day** discrepancy. ([Wikipedia][1])
* In **2100**, confirm it becomes **14 days** after the boundary. ([Wikipedia][2])

### The 1582 reform gap (only if modeling a historical 1582 cutover)

If the policy uses the initial 1582 adoption:

* `1582-10-04` (last Julian day in that cutover model)
* `1582-10-15` (first Gregorian day in that cutover model)
* `1582-10-05` through `1582-10-14` should be treated as **nonexistent / invalid** inputs under that specific cutover model ([Wikipedia][2])

If the policy is **proleptic Gregorian**, all of those dates are valid Gregorian dates (no gap); this is the point of the test.

### Proleptic Gregorian agreement for pre-1582 dates (ISO-style)

Pick at least one date before 1582 and require that the API/user specify the policy:

* `1500-03-01` (or any pre-1582 date)

Expected behavior depends on policy:

* historical/cutover models may interpret it as Julian (or reject without jurisdiction)
* proleptic Gregorian interprets it under Gregorian rules

ISO 8601 explicitly treats pre-1582 usage as by agreement in interchange, so the test is “do we force/record the agreement/policy?”. ([Wikipedia][5])

### JDN noon boundary (if using JDN internally or exposing it)

Pick a civil date where you can assert the noon boundary behavior:

* `2000-01-01` at `00:00 UT` vs `12:00 UT`

Expectation (conceptual):

* the JDN integer “ticks” at **noon UT**, not midnight, so any mapping from civil midnight to JDN must explicitly account for the half-day offset. ([Wikipedia][7])

Even if you only accept whole days, this test catches “floor vs round” mistakes when you bridge to/from JDN.

### Year numbering at the BCE/CE boundary

If BCE is supported, include paired tests to ensure a consistent convention:

* ISO/astronomical convention: year `0000` corresponds to `1 BC` ([Wikipedia][5])
* Historical convention: sequence goes `1 BC` → `AD 1` with no year 0

Choose one representation for input/output and enforce it; this is where off-by-one-year bugs hide.


[1]: https://en.wikipedia.org/wiki/Julian_calendar "Julian calendar"
[2]: https://en.wikipedia.org/wiki/Gregorian_calendar "Gregorian calendar"
[3]: https://en.wikipedia.org/wiki/Leap_year "Leap year"
[4]: https://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar "Proleptic Gregorian calendar"
[5]: https://en.wikipedia.org/wiki/ISO_8601 "ISO 8601"
[6]: https://www.britannica.com/science/Julian-calendar "Julian calendar | History & Difference from Gregorian ..."
[7]: https://en.wikipedia.org/wiki/Julian_day "Julian day"
