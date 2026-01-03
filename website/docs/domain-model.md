# Domain Model: Maya Calendar System

This document explains the Maya calendar system as implemented in this library, including the mathematical relationships and historical context.

## Overview

The ancient Maya civilization used multiple interlocking calendar systems to track time. This library implements the three main components:

1. **Tzolkin** - Sacred 260-day cycle
2. **Haab** - Solar 365-day approximation
3. **Long Count** - Absolute chronology (linear)

## The Tzolkin (Sacred Calendar)

### Structure

The Tzolkin is formed by combining two cycles:
- **13 numbers** (coefficients): 1, 2, 3, ..., 13
- **20 day names**: Imix, Ik', Ak'bal, K'an, ...

```
Day 1:  1 Imix
Day 2:  2 Ik'
Day 3:  3 Ak'bal
...
Day 20: 7 Ajaw
Day 21: 8 Imix  (coefficient wraps at 13, day wraps at 20)
...
Day 260: 13 Ajaw  (both cycles complete)
Day 261: 1 Imix   (starts over)
```

### The 20 Day Names

| # | Name | Meaning | # | Name | Meaning |
|---|------|---------|---|------|---------|
| 1 | Imix | Earth/Crocodile | 11 | Chuwen | Monkey |
| 2 | Ik' | Wind | 12 | Eb | Road |
| 3 | Ak'bal | Night | 13 | Ben | Reed |
| 4 | K'an | Corn | 14 | Ix | Jaguar |
| 5 | Chikchan | Serpent | 15 | Men | Eagle |
| 6 | Kimi | Death | 16 | Kib | Wax |
| 7 | Manik' | Deer | 17 | Kaban | Earth |
| 8 | Lamat | Venus | 18 | Etz'nab | Flint |
| 9 | Muluk | Water | 19 | Kawak | Storm |
| 10 | Ok | Dog | 20 | Ajaw | Lord |

### Mathematics

Since GCD(13, 20) = 1, the cycle length is:
```
LCM(13, 20) = 13 × 20 = 260 days
```

### Implementation

```typescript
class Tzolkin {
  coeff: ICoefficient;      // 1-13 or wildcard
  day: TzolkinDay | Wildcard;  // 20 names or wildcard

  next(): Tzolkin {
    const newCoeff = this.coeff.next();  // Cycles 1→13→1
    const newDay = this.day.next();      // Cycles through 20 names
    return getTzolkin(newCoeff, newDay);
  }
}
```

---

## The Haab (Solar Year)

### Structure

The Haab approximates the solar year with:
- **18 months** of 20 days each = 360 days
- **1 short month** (Wayeb) of 5 days = 5 days
- **Total**: 365 days (close to solar year of ~365.25 days)

### The 19 Month Names

| # | Name | Days | Season |
|---|------|------|--------|
| 1 | Pop | 0-19 | Spring |
| 2 | Wo | 0-19 | |
| 3 | Sip | 0-19 | |
| 4 | Sotz' | 0-19 | |
| 5 | Sek | 0-19 | Summer |
| 6 | Xul | 0-19 | |
| 7 | Yaxk'in | 0-19 | |
| 8 | Mol | 0-19 | |
| 9 | Ch'en | 0-19 | Fall |
| 10 | Yax | 0-19 | |
| 11 | Sak | 0-19 | |
| 12 | Keh | 0-19 | |
| 13 | Mak | 0-19 | Winter |
| 14 | K'ank'in | 0-19 | |
| 15 | Muwan | 0-19 | |
| 16 | Pax | 0-19 | |
| 17 | K'ayab | 0-19 | |
| 18 | Kumk'u | 0-19 | |
| 19 | Wayeb | 0-4 | Unlucky days |

### Day Numbering

Unlike modern calendars, Haab days are numbered 0-19 (not 1-20):
```
0 Pop  (first day of Pop)
1 Pop
2 Pop
...
19 Pop (last day of Pop)
0 Wo   (first day of Wo)
```

### Implementation

```typescript
class Haab {
  coeff: ICoefficient;        // 0-19 or wildcard
  month: HaabMonth | Wildcard;   // 19 names or wildcard

  next(): Haab {
    let newCoeff = this.coeff.next();
    let newMonth = this.month;

    // Special handling for month transitions
    if (this.coeff.toString() === '19' && this.month.toString() !== 'Wayeb') {
      newCoeff = new NumberCoefficient(0);
      newMonth = this.month.next();
    } else if (this.coeff.toString() === '4' && this.month.toString() === 'Wayeb') {
      newCoeff = new NumberCoefficient(0);
      newMonth = /* back to Pop */;
    }

    return getHaab(newCoeff, newMonth);
  }
}
```

---

## The Calendar Round (Tzolkin + Haab)

### The 52-Year Cycle

When Tzolkin (260 days) and Haab (365 days) run concurrently:

```
LCM(260, 365) = 18,980 days ≈ 52 solar years
```

This means **the same Tzolkin-Haab combination only recurs every 52 years**.

### Example Progression

```
Day 1:   1 Imix 0 Pop
Day 2:   2 Ik' 1 Pop
Day 3:   3 Ak'bal 2 Pop
...
Day 365: 2 Ik' 0 Pop
Day 366: 3 Ak'bal 1 Pop
...
Day 18,980: 1 Imix 0 Pop  (cycle complete!)
```

### Historical Significance

A person would only see the same Calendar Round date repeat **once** in their lifetime (if they lived past 52). For dates beyond a human lifespan, the Long Count is needed.

### Implementation

```typescript
class CalendarRound {
  tzolkin: Tzolkin;
  haab: Haab;

  next(): CalendarRound {
    // Both cycles advance independently
    return getCalendarRound(
      this.tzolkin.next(),
      this.haab.next()
    );
  }

  diff(other: CalendarRound): DistanceNumber {
    // Find distance within 18,980-day cycle
    // Complex algorithm handles wrap-around
  }
}
```

---

## The Long Count (Absolute Chronology)

### Purpose

The Long Count provides **absolute chronology** - a day count from a mythological creation date.

### Base-20 Vigesimal System

| Position | Name | Multiplier | Example |
|----------|------|------------|---------|
| 4 | B'ak'tun | 144,000 days | 9 |
| 3 | K'atun | 7,200 days | 17 |
| 2 | Tun | 360 days | 0 |
| 1 | Winal | 20 days | 0 |
| 0 | K'in | 1 day | 0 |

**Example**: `9.17.0.0.0`
```
= 9 × 144,000 days
  + 17 × 7,200 days
  + 0 × 360 days
  + 0 × 20 days
  + 0 × 1 days
= 1,296,000 + 122,400
= 1,418,400 days since creation
```

### The Creation Date

**Maya Mythology**: 0.0.0.0.0 = 4 Ajaw 8 Kumk'u

**Correlation to Western Calendar**:
- GMT (584283): **August 11, 3114 BCE** (Proleptic Gregorian)
- This is the most widely accepted correlation

### Mixed-Radix Exception

⚠️ **Important**: The Winal position uses **base-18**, not base-20!

```
Reason: 18 Winals × 20 days = 360 days ≈ solar year
```

This makes the Tun approximately equal to a solar year.

### Implementation

```typescript
class LongCount extends DistanceNumber {
  parts: (number | Wildcard)[];

  getTotalDays(): number {
    const multipliers = [1, 20, 360, 7200, 144000, ...];
    return this.parts.reduce((sum, part, i) => {
      return sum + (typeof part === 'number' ? part * multipliers[i] : 0);
    }, 0);
  }

  getJulianDay(): number {
    return this.correlationConstant.jdnOrigin + this.getTotalDays();
  }
}
```

---

## The Full Date (Complete Specification)

### Why Both?

| System | Precision | Uniqueness |
|--------|-----------|------------|
| **Calendar Round** | Within 52 years | Ambiguous for events > 52 years apart |
| **Long Count** | Absolute | Unique across millennia |
| **Full Date** | Absolute + Cyclic | Best of both worlds |

### Example

```
4 Ajaw 8 Kumk'u 9.17.0.0.0
└─────┬──────┘ └─────┬─────┘
  Calendar Round    Long Count
  (repeats every    (absolute
   52 years)         chronology)
```

### Verification

The Calendar Round components must **match** what the Long Count implies:
- 9.17.0.0.0 → 1,418,400 days since creation
- 1,418,400 mod 260 = specific Tzolkin date
- 1,418,400 mod 365 = specific Haab date
- Must equal "4 Ajaw 8 Kumk'u"

### Implementation

```typescript
class FullDate {
  cr: CalendarRound;
  lc: LongCount;

  equal(other: IPart): boolean {
    if (other instanceof FullDate) {
      // Both components must match
      return this.cr.equal(other.cr) && this.lc.equal(other.lc);
    }
    return false;
  }

  isPartial(): boolean {
    // Partial if either component has wildcards
    return this.cr.isPartial() || this.lc.isPartial();
  }
}
```

---

## Additional Calendar Elements

### Lord of the Night (G-Glyphs)

A 9-day cycle associated with Long Count dates:

```
G1, G2, G3, G4, G5, G6, G7, G8, G9, (repeat)
```

**Calculation**:
```typescript
getLordOfTheNight(): LordOfTheNight {
  const position = (this.getTotalDays() + 1) % 9;
  return lords[position];
}
```

**Example**: 9.17.0.0.0 → G9

### Correlation Constants

Maps Maya dates to Western calendars:

```typescript
class CorrelationConstant {
  readonly correlationConstant: number;  // 584283 for GMT
  readonly jdnOrigin: number;            // Julian Day Number of 0.0.0.0.0

  constructor(constant: number) {
    this.correlationConstant = constant;
    this.jdnOrigin = constant;
  }
}
```

**Usage**: LongCount + Correlation Constant → Julian Day Number → Gregorian Date

---

## Wildcards in the Domain Model

### Purpose

Wildcards represent **unknown or variable** portions of dates:
- Historical gaps: `"* Ajaw 8 Kumk'u 9.17.0.0.0"` (coefficient unknown)
- Pattern matching: `"4 Ajaw * * 9.17.0.0.0"` (Haab unknown)
- Date queries: `"* * * * 9.*.*.*.0"` (find all matching)

### Implementation

```typescript
class Wildcard extends CommentWrapper implements IPart {
  toString(): string {
    return '*';
  }

  equal(other: IPart): boolean {
    return isWildcard(other);  // Wildcards equal each other
  }
}
```

### Wildcard Positions

Any component can be a wildcard:

```typescript
// Calendar Round wildcards
type CoefficientType = NumberCoefficient | WildcardCoefficient;
type DayType = TzolkinDay | Wildcard;
type MonthType = HaabMonth | Wildcard;

// Long Count wildcards
type LongCountPart = number | Wildcard;
```

### Expansion

```typescript
const partial = new FullDateFactory().parse('* Ajaw 8 Kumk\'u 9.17.0.0.0');
const expander = new FullDateWildcard(partial);
const allMatches = expander.run();

// Returns all dates with format: [1-13] Ajaw 8 Kumk'u 9.17.0.0.0
console.log(allMatches.length); // 13 (one for each coefficient)
```

---

## Mathematical Relationships

### Cycle Periods

| Cycle | Period | Formula |
|-------|--------|---------|
| Tzolkin | 260 days | 13 × 20 |
| Haab | 365 days | 18 × 20 + 5 |
| Calendar Round | 18,980 days | LCM(260, 365) |
| Tun | 360 days | 18 × 20 |
| K'atun | 7,200 days | 20 × 360 |
| B'ak'tun | 144,000 days | 20 × 7,200 |

### Why 52 Years?

```
Calendar Round = 18,980 days
Solar Year ≈ 365.25 days
18,980 ÷ 365.25 ≈ 52 years
```

### Long Count Day Calculation

```typescript
function longCountToDays(parts: number[]): number {
  const [kin, winal, tun, katun, baktun, ...higher] = parts;
  
  let total = kin;                    // 1
  total += winal * 20;                // 20
  total += tun * 20 * 18;             // 360
  total += katun * 20 * 18 * 20;      // 7,200
  total += baktun * 20 * 18 * 20 * 20; // 144,000
  
  // Higher cycles (rare)
  let multiplier = 144,000;
  for (const cycle of higher) {
    multiplier *= 20;
    total += cycle * multiplier;
  }
  
  return total;
}
```

---

## Western Calendar Conversion

### Julian Day Number (JDN)

An intermediate representation for calendar conversions:
- **Definition**: Days since January 1, 4713 BCE (Proleptic Julian)
- **Purpose**: Universal day count independent of calendar system

### Conversion Chain

```
Long Count → Julian Day Number → Gregorian/Julian Date
    ↓              ↓                      ↓
 1,418,400    +  584283         →   Dec 21, 2012
(days since   (correlation     (Gregorian)
 creation)     constant)
```

### Implementation

```typescript
class LongCount {
  getJulianDay(): number {
    return this.correlationConstant.jdnOrigin + this.getTotalDays();
  }

  asGregorian(): GregorianCalendarDate {
    return new GregorianCalendarDate(this.getJulianDay());
  }

  asJulian(): JulianCalendarDate {
    return new JulianCalendarDate(this.getJulianDay());
  }
}
```

### Correlation Debate

Multiple theories exist for Maya-Gregorian alignment:

| Constant | Name | 0.0.0.0.0 Date | Status |
|----------|------|----------------|--------|
| 584283 | GMT | Aug 11, 3114 BCE | **Most accepted** |
| 584285 | Modified GMT | Aug 13, 3114 BCE | Alternative |
| 584281 | Spinden | Oct 14, 3114 BCE | Less common |

**This library defaults to GMT (584283)** but allows configuration.

---

## Domain Invariants

### 1. Calendar Round Synchronization

**Invariant**: For any Full Date, the CR must match what the LC implies.

```typescript
// Given LC, calculate expected CR
const lc = new LongCount(9, 17, 0, 0, 0);
const days = lc.getTotalDays(); // 1,418,400

const expectedTzolkin = origin.shift(days % 260);
const expectedHaab = originHaab.shift(days % 365);
const expectedCR = getCalendarRound(expectedTzolkin, expectedHaab);

// Full date must match
const fullDate = new FullDate(expectedCR, lc); // Valid
const badDate = new FullDate(wrongCR, lc);     // Inconsistent (not enforced)
```

**Note**: The library currently doesn't enforce this invariant; it's the user's responsibility.

### 2. Winal Range Restriction

**Invariant**: Winal position (position 1 in LC) must be 0-17, not 0-19.

```typescript
// Valid
new LongCount(9, 17, 0, 0, 0);  // ✓ Winal = 0

// Invalid (would violate Tun definition)
new LongCount(9, 19, 0, 0, 0);  // ✗ Winal = 19 (not allowed)
```

**Why**: Because Tun = 18 Winals = 360 days (not 20 × 20 = 400)

### 3. Haab Coefficient Ranges

**Invariant**: Coefficients depend on month:
- Regular months: 0-19 (20 days)
- Wayeb: 0-4 (5 days only)

```typescript
// Valid
new Haab(new NumberCoefficient(4), getHaabMonth('Wayeb'));  // ✓

// Invalid
new Haab(new NumberCoefficient(19), getHaabMonth('Wayeb')); // ✗ Wayeb only has 5 days
```

---

## Comments as Metadata

### Purpose

Attach scholarly annotations, historical context, or notes to dates:

```typescript
const date = factory.parse('4 Ajaw 8 Kumk\'u 9.17.0.0.0');

date
  .setComment('Creation date')
  .appendComment('According to the Popol Vuh');

// Comments preserved through operations
const next = date.shift(1);
console.log(next.comment.text); // Inherited
```

### Use Cases

- Historical context
- Scholarly notes
- Source citations
- Uncertainty indicators
- Translation notes

---

## Distance Numbers

### Purpose

Represent **relative time spans** rather than absolute dates.

### Difference from Long Count

| Long Count | Distance Number |
|------------|----------------|
| Absolute date | Relative duration |
| Always positive | Can be negative |
| Has correlation constant | No correlation |
| Converts to western dates | Represents interval |

### Operations

```typescript
const interval = new DistanceNumber(0, 0, 1, 0, 0);  // 1 Tun = 360 days

// Sign handling
console.log(interval.isPositive); // true
console.log(interval.sign);       // 1

const negative = new DistanceNumber(0, 0, 0, 0, -100);
console.log(negative.isNegative); // true
console.log(negative.sign);       // -1
```

---

## Pattern Matching with Wildcards

### Single Wildcard

```typescript
const pattern = '* Ajaw 8 Kumk\'u 9.17.0.0.0';
const expander = new FullDateWildcard(factory.parse(pattern));
const matches = expander.run();

// Returns 13 dates: 1 Ajaw ..., 2 Ajaw ..., ..., 13 Ajaw ...
```

### Multiple Wildcards

```typescript
const pattern = '* * * Kumk\'u 9.17.0.0.0';
//              ↑ ↑ ↑
//              coeff, day, haab-coeff all unknown

const matches = expander.run();
// Returns 13 × 20 × 20 = 5,200 matching dates
```

### Cartesian Product

For `n` wildcards with ranges `r₁, r₂, ..., rₙ`:
```
Total matches = r₁ × r₂ × ... × rₙ
```

**Example**: `* * * * *.*.*.*.*`

**Note**: This is an approximation to demonstrate combinatorial explosion. The exact count varies because:
- Haab coefficient range depends on the month (0-19 for regular months, 0-4 for Wayeb)
- Higher Long Count cycles beyond B'ak'tun are theoretically unbounded

Approximate calculation:
```
≈ 13 × 20 × (avg ~18) × 19 × (varies) × 20 × 18 × 18 × 20
≈ billions of combinations
```

---

## Validation Rules

### Tzolkin

- Coefficient: 1-13 (no 0)
- Day: Must be one of 20 valid names
- Both can be wildcards

### Haab

- Coefficient: 0-19 for regular months, 0-4 for Wayeb
- Month: Must be one of 19 valid names
- Both can be wildcards

### Long Count

- Parts: Each position 0-19, except Winal (0-17)
- Can extend to higher cycles (Pictun, Calabtun, etc.)
- Any position can be wildcard
- Must have at least 2 parts (K'in and Winal minimum)

---

## Historical Context

### Timeline of Maya Calendar

- **Classic Period**: 250-900 CE (Long Count widely used)
- **Post-Classic**: 900-1521 CE (Calendar Round more common)
- **Spanish Conquest**: 1521 CE (calendar use declined)
- **Modern Revival**: 20th-21st century (scholarly reconstruction)

### The 2012 Phenomenon

**Date**: 13.0.0.0.0 (December 21, 2012)

**Significance**:
- End of 13th B'ak'tun
- Beginning of 14th B'ak'tun (0.0.0.0.1)
- **Not** "end of calendar" (popularly misunderstood)
- Just like odometer rolling over

**Calendar continues**: 14.0.0.0.0, 15.0.0.0.0, etc.

---

## Domain Model Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         FullDate                            │
│  "4 Ajaw 8 Kumk'u 9.17.0.0.0"                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────┐   ┌──────────────────────────┐ │
│  │   CalendarRound        │   │     LongCount            │ │
│  │   "4 Ajaw 8 Kumk'u"    │   │     "9.17.0.0.0"         │ │
│  ├────────────────────────┤   ├──────────────────────────┤ │
│  │                        │   │  extends DistanceNumber  │ │
│  │  ┌──────────────────┐ │   │  parts: [0,0,0,17,9]     │ │
│  │  │ Tzolkin          │ │   │  + arithmetic            │ │
│  │  │ "4 Ajaw"         │ │   │  + western conversion    │ │
│  │  ├──────────────────┤ │   │  + lord of night         │ │
│  │  │ coeff: 4         │ │   │  + correlation constant  │ │
│  │  │ day: Ajaw        │ │   └──────────────────────────┘ │
│  │  └──────────────────┘ │                                │
│  │                        │                                │
│  │  ┌──────────────────┐ │                                │
│  │  │ Haab             │ │                                │
│  │  │ "8 Kumk'u"       │ │                                │
│  │  ├──────────────────┤ │                                │
│  │  │ coeff: 8         │ │                                │
│  │  │ month: Kumk'u    │ │                                │
│  │  └──────────────────┘ │                                │
│  └────────────────────────┘                                │
│                                                              │
│  All extend CommentWrapper (comment metadata)               │
│  All implement IPart (equality comparison)                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Type Hierarchy

### Class Hierarchy

```
Object
│
├── Comment
│   └── (standalone, not inherited)
│
├── CommentWrapper (abstract mixin)
│   ├── Wildcard
│   ├── DistanceNumber (abstract)
│   │   └── LongCount
│   ├── CalendarRound
│   ├── Tzolkin
│   ├── Haab
│   ├── FullDate
│   ├── LongcountOperation (abstract)
│   │   ├── LongcountAddition
│   │   └── LongcountSubtraction
│   └── *Wildcard (operation classes)
│
├── Base (abstract)
│   └── Cycle (abstract)
│       ├── HaabMonth
│       └── TzolkinDay
│
├── ICoefficient (interface)
│   ├── NumberCoefficient
│   └── WildcardCoefficient
│
└── Factory (abstract)
    ├── CalendarRoundFactory
    ├── LongCountFactory
    ├── FullDateFactory
    └── GregorianFactory
```

### Interface Implementation

```
IPart (interface)
├── Wildcard ✓
├── Comment ✗ (doesn't implement)
├── DistanceNumber ✓
├── LongCount ✓
├── CalendarRound ✓
├── Tzolkin ✓
├── Haab ✓
├── FullDate ✓
└── All Operations ✓
```

---

## Calendar Mathematics

### Modular Arithmetic

Calendar cycling relies heavily on modular arithmetic:

```typescript
// Tzolkin coefficient: cycles 1-13
nextCoeff = ((current - 1 + 1) % 13) + 1;
// Subtract 1 (0-indexed), add increment, mod 13, add 1 back

// Tzolkin day: cycles 0-19
nextDay = (current + 1) % 20;

// Haab coefficient: cycles 0-19 (or 0-4 for Wayeb)
nextCoeff = (current + 1) % (maxForMonth + 1);
```

### Long Count Carries

```typescript
// Adding 1.0.0.0.19 + 0.0.0.0.1
//        B  K  T  W  K           W  K
Input:     1. 0. 0. 0.19    +    0. 0. 0. 0. 1
                         ↓
K'in:      19 + 1 = 20, write 0, carry 1
Winal:     0 + 0 + 1 = 1, write 1, carry 0
Result:    1. 0. 0. 1. 0  ✓
```

### Mixed-Radix Complexity

```typescript
// Position-dependent modulo
function getModulo(position: number): number {
  if (position === 1) {
    return 18;  // Winal → Tun transition
  }
  return 20;    // All other positions
}

// Example: 0.0.0.17.19 + 0.0.0.0.1
//          T  W  K
Input:     0. 0.17.19   +   0. 0. 0. 1
K'in:      19 + 1 = 20 → 0, carry 1
Winal:     17 + 0 + 1 = 18 → 0, carry 1  (max 17, not 19!)
Tun:       0 + 0 + 1 = 1
Result:    0. 1. 0. 0  ✓
```

---

## Edge Cases

### Wayeb (5-Day Month)

```typescript
// Last day of Wayeb
const lastWayeb = getHaab(
  new NumberCoefficient(4),
  getHaabMonth('Wayeb')
);

const nextDay = lastWayeb.next();
console.log(nextDay.toString()); // "0 Pop" (wraps to new year)
```

### Long Count Overflows

```typescript
// 19.19.19.17.19 + 0.0.0.0.1
const lc = new LongCount(19, 19, 19, 17, 19);
const result = lc.plus(new DistanceNumber(0, 0, 0, 0, 1)).run();
console.log(result.toString()); // "20.0.0.0.0" (adds new position)
```

### Zero Dates

```typescript
// 0.0.0.0.0 is valid (creation date)
const creation = new LongCount(0, 0, 0, 0, 0);
console.log(creation.asGregorian()); // Aug 11, 3114 BCE (GMT)

// Calendar Round of creation
const cr = origin; // 4 Ajaw 8 Kumk'u
```

---

## Gregorian-Julian Calendar Transition

### The 1582 Gap

When Pope Gregory XIII reformed the calendar:
- **Skipped**: October 5-14, 1582
- **Purpose**: Realign with solar year

### Handling in Library

```typescript
// Dates around transition are marked
'lc(11.18.3.9.18) -> g(15/10/1582 CE*: 2299161)'  // ← Note the *
'lc(11.18.3.9.17) -> g(4/10/1582 CE*: 2299160)'   // ← Note the *

// Julian calendar continues unaffected
'lc(11.18.3.9.18) -> j(15/10/1582 CE: 2299161)'   // No gap
```

---

## Real-World Examples

### Classic Maya Inscriptions

#### Stela 29, Tikal (oldest LC inscription)

```
8.12.14.8.15  13 Men 3 Sip
```

**Translation**: 292 CE (July 6)

#### Temple of Inscriptions, Palenque

```
9.13.0.0.0  8 Ajaw 8 Wo
```

**Translation**: 692 CE (March 12)

#### Modern Date

```
13.0.0.0.0  4 Ajaw 3 K'ank'in
```

**Translation**: December 21, 2012 (famous "end date")

### Using the Library

```typescript
const factory = new FullDateFactory();

// Parse ancient inscription
const tikal = factory.parse('13 Men 3 Sip 8.12.14.8.15');

// Convert to modern date
console.log(tikal.lc.asGregorian()); // July 6, 292 CE

// Add context
tikal.setComment('Stela 29, Tikal - Oldest known Long Count inscription');

// Calculate time span
const modern = new LongCount(13, 0, 0, 0, 0);
const elapsed = modern.minus(tikal.lc).run();
console.log(elapsed.getTotalDays()); // Days between dates
```

---

## Summary

The Maya calendar system implemented in this library demonstrates:

1. **Mathematical Sophistication**: Interlinked cycles with coprime periods
2. **Absolute Chronology**: Long Count spanning millennia
3. **Precision**: Day-accurate across 5,000+ years
4. **Flexibility**: Wildcards for partial/uncertain dates
5. **Interoperability**: Conversions to Western calendars

The domain model faithfully represents these aspects while maintaining clean code through established design patterns.

