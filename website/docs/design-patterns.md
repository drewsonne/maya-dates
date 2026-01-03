# Design Patterns Reference

This document catalogs the design patterns used throughout the `@drewsonne/maya-dates` codebase with detailed examples and rationale.

## Table of Contents

1. [Creational Patterns](#creational-patterns)
2. [Structural Patterns](#structural-patterns)
3. [Behavioral Patterns](#behavioral-patterns)
4. [Domain-Specific Patterns](#domain-specific-patterns)

---

## Creational Patterns

### Singleton Pattern with Factory Functions

**Intent**: Ensure only one instance exists for each unique calendar date, enabling efficient equality comparisons.

#### Implementation

```typescript
// src/cr/calendar-round.ts
const singleton: { [key: string]: CalendarRound } = {};

export function getCalendarRound(
  tzolkin: Tzolkin,
  haab: Haab
): CalendarRound {
  const crId = `${tzolkin} ${haab}`;
  if (singleton[crId] === undefined) {
    singleton[crId] = new CalendarRound(tzolkin, haab);
  }
  return singleton[crId];
}
```

#### Usage Example

```typescript
const cr1 = getCalendarRound(tzolkin1, haab1);
const cr2 = getCalendarRound(tzolkin1, haab1);

// Identity comparison works!
console.log(cr1 === cr2); // true
```

#### Applicability

✅ **Use when**:
- Objects are immutable
- Equality comparison is frequent
- Object creation is expensive
- Memory efficiency matters

❌ **Avoid when**:
- Objects are mutable
- Each instance needs unique state
- Testing requires fresh instances

#### Instances in Codebase

| Function | Module | Purpose |
|----------|--------|---------|
| `getCalendarRound()` | `cr/calendar-round.ts` | CR date instances |
| `getTzolkin()` | `cr/tzolkin.ts` | 260-day cycle dates |
| `getHaab()` | `cr/haab.ts` | 365-day cycle dates |
| `getHaabMonth()` | `cr/component/haabMonth.ts` | Month components |
| `getTzolkinDay()` | `cr/component/tzolkinDay.ts` | Day name components |
| `getCorrelationConstant()` | `lc/correlation-constant.ts` | Alignment constants |

---

### Factory Method Pattern

**Intent**: Provide an interface for creating objects, allowing subclasses to decide which class to instantiate.

#### Base Factory

```typescript
// src/factory/base.ts
export default abstract class Factory {
  pattern: RegExp;

  constructor(pattern: RegExp) {
    this.pattern = pattern;
  }

  /**
   * Template method - defines parsing skeleton
   */
  split(raw: string): string[] {
    const matches = raw.match(this.pattern);
    if (matches === null) {
      return [];
    }
    return matches.slice(1);
  }

  // Subclasses must implement:
  // abstract parse(raw: string): DomainObject;
}
```

#### Concrete Factory

```typescript
// src/factory/full-date.ts
export default class FullDateFactory extends Factory {
  constructor() {
    // Complex regex for full Maya date strings
    super(/^(.*\d+\s+\S+\s+\d+\s+\S+)\s+(.*)$/);
  }

  parse(raw: string): FullDate {
    const parts = this.split(raw);
    const cr = new CalendarRoundFactory().parse(parts[0]);
    const lc = new LongCountFactory().parse(parts[1]);
    return new FullDate(cr, lc);
  }
}
```

#### Usage Example

```typescript
const factory = new FullDateFactory();
const date = factory.parse('4 Ajaw 8 Kumk\'u 9.17.0.0.0');
```

#### Benefits

- **Encapsulation**: Parsing logic separate from domain objects
- **Reusability**: Factories can be reused across application
- **Testability**: Easy to test parsing independently
- **Extensibility**: Add new date formats without modifying domain model

---

## Structural Patterns

### Mixin Pattern (via Inheritance)

**Intent**: Add cross-cutting functionality (comments) to multiple unrelated classes without multiple inheritance.

#### Implementation

```typescript
// src/comment-wrapper.ts
export abstract class CommentWrapper {
  comment: Comment;

  protected constructor() {
    this.comment = new Comment('');
  }

  /**
   * Chainable comment methods
   */
  setComment(comment: Comment | string): this {
    // ... implementation
    return this;
  }

  appendComment(comment: Comment | string): this {
    // ... implementation
    return this;
  }

  resetComment(): this {
    this.comment = new Comment('');
    return this;
  }

  commentIsEqual(other: CommentWrapper): boolean {
    return this.comment.equals(other.comment);
  }
}
```

#### Usage Across Domain

```typescript
// All major date types can have comments
class CalendarRound extends CommentWrapper { /* ... */ }
class LongCount extends DistanceNumber { /* ... */ }
class DistanceNumber extends CommentWrapper { /* ... */ }
class FullDate extends CommentWrapper { /* ... */ }
class Wildcard extends CommentWrapper { /* ... */ }
```

#### Real-World Usage

```typescript
const date = factory.parse('4 Ajaw 8 Kumk\'u 9.17.0.0.0');

date
  .setComment('Creation date in Maya mythology')
  .appendComment('Correlates to Aug 11, 3114 BCE (GMT)');

console.log(date.comment.text);
```

---

### Composite Pattern

**Intent**: Compose objects into tree structures to represent part-whole hierarchies.

#### Structure

```
FullDate
├── CalendarRound
│   ├── Tzolkin
│   │   ├── NumberCoefficient (1-13)
│   │   └── TzolkinDay (20 names)
│   └── Haab
│       ├── NumberCoefficient (0-19)
│       └── HaabMonth (19 names)
└── LongCount
    └── parts[] (array of cycles)
```

#### Implementation

```typescript
// Parent delegates to children
class FullDate {
  cr: CalendarRound;
  lc: LongCount;

  toString(): string {
    return `${this.cr} ${this.lc}`;  // Delegate to children
  }

  isPartial(): boolean {
    return this.cr.isPartial() || this.lc.isPartial();  // Aggregate
  }

  equal(other: IPart): boolean {
    if (other instanceof FullDate) {
      return this.cr.equal(other.cr) && this.lc.equal(other.lc);  // Compare parts
    }
    return false;
  }
}
```

#### Benefits

- **Uniform Treatment**: Work with composite and individual objects uniformly
- **Recursive Operations**: Operations cascade through tree
- **Extensibility**: Easy to add new component types

---

### Adapter Pattern (Implicit)

**Intent**: Convert between incompatible interfaces (Maya ↔ Western calendars).

#### Implementation

```typescript
// src/lc/long-count.ts
class LongCount {
  /**
   * Adapt Maya LC to Julian Day Number
   */
  getJulianDay(): number {
    return this.correlationConstant.jdnOrigin + this.getTotalDays();
  }

  /**
   * Adapt to Gregorian calendar
   */
  asGregorian(): GregorianCalendarDate {
    return new GregorianCalendarDate(this.getJulianDay());
  }

  /**
   * Adapt to Julian calendar
   */
  asJulian(): JulianCalendarDate {
    return new JulianCalendarDate(this.getJulianDay());
  }
}
```

#### Benefits

- **Interoperability**: Maya dates work with Western calendar systems
- **Encapsulation**: Conversion logic hidden in adapters
- **Flexibility**: Easy to add new calendar systems

---

## Behavioral Patterns

### Strategy Pattern

**Intent**: Define a family of algorithms (date operations), encapsulate each one, and make them interchangeable.

#### Base Strategy

```typescript
// src/operations/longcount-operation.ts
export default abstract class LongcountOperation extends CommentWrapper implements IPart {
  protected readonly a: DistanceNumber;
  protected readonly b: DistanceNumber;
  protected readonly LcClass: ILongcount;

  constructor(lcClass: ILongcount, a: DistanceNumber, b: DistanceNumber) {
    super();
    this.a = a;
    this.b = b;
    this.LcClass = lcClass;
  }

  protected abstract operate(/* ... */): number | Wildcard;
  
  abstract equal(other: unknown): boolean;
}
```

#### Concrete Strategies

```typescript
// Addition strategy
class LongcountAddition extends LongcountOperation {
  protected operate(a: number, b: number, carryIn: number): [number, number] {
    const sum = a + b + carryIn;
    const carryOut = Math.floor(sum / this.getModulo(position));
    const result = sum % this.getModulo(position);
    return [result, carryOut];
  }
}

// Subtraction strategy
class LongcountSubtraction extends LongcountOperation {
  protected operate(a: number, b: number, borrowIn: number): [number, number] {
    const diff = a - b - borrowIn;
    const borrowOut = diff < 0 ? 1 : 0;
    const result = diff < 0 ? diff + this.getModulo(position) : diff;
    return [result, borrowOut];
  }
}
```

#### Usage

```typescript
const lc1 = new LongCount(9, 17, 0, 0, 0);
const dn = new DistanceNumber(0, 0, 1, 0, 0);

// Strategy selected at creation
const sum = lc1.plus(dn);      // LongcountAddition
const diff = lc1.minus(dn);    // LongcountSubtraction

console.log(sum.run());        // 9.17.1.0.0
console.log(diff.run());       // 9.16.19.0.0
```

---

### Template Method Pattern

**Intent**: Define the skeleton of an algorithm, letting subclasses override specific steps.

#### Base Template

```typescript
// src/cr/component/cycle.ts
export default abstract class Cycle extends Base {
  /**
   * Template method - defines cycling algorithm
   */
  shift(incremental: number): Cycle {
    if (incremental === 0) {
      return this;  // Base case
    }
    return this.nextCalculator().shift(incremental - 1);  // Recursive step
  }

  /**
   * Primitive operation - uses subclass generator
   */
  private nextCalculator(): Cycle {
    if (this.nextHolder === null) {
      let newPosition = (this.position + 1) % (this.cycleLength - 1);
      newPosition = (newPosition === 0) ? (this.cycleLength - 1) : newPosition;
      let potentialPosition = this.generator(newPosition);  // ← Subclass hook
      this.nextHolder = potentialPosition as Cycle;
    }
    return this.nextHolder;
  }

  /**
   * Hook method - subclasses must implement validation
   */
  abstract validate(): boolean;
}
```

#### Concrete Implementation

```typescript
// src/cr/component/haabMonth.ts
export class HaabMonth extends Cycle {
  constructor(raw: string | Wildcard) {
    super(raw, months, getHaabMonth);  // Pass custom generator
    this.validate();
  }

  /**
   * Implements hook method
   */
  validate(): boolean {
    if (!isWildcard(this.value)) {
      if (!months.includes(this.value)) {
        throw new Error(`Invalid month: ${this.value}`);
      }
    }
    return true;
  }
}
```

#### Benefits

- **Code Reuse**: Common cycling logic in base class
- **Flexibility**: Subclasses customize specific steps
- **Maintainability**: Changes to algorithm in one place

---

### Iterator Pattern (Implicit)

**Intent**: Provide a way to access elements of a collection sequentially.

#### Implementation

```typescript
// Linked list iteration via next()
class Cycle {
  private nextHolder: Cycle | null;

  next(): Cycle {
    return this.shift(1);
  }

  shift(n: number): Cycle {
    // Recursive iteration through linked elements
    if (n === 0) return this;
    return this.nextCalculator().shift(n - 1);
  }
}
```

#### Usage

```typescript
let current = getTzolkin(1, 'Imix');

// Iterate through cycle
for (let i = 0; i < 260; i++) {
  console.log(current.toString());
  current = current.next();
}
```

---

## Domain-Specific Patterns

### Pattern: Wildcard Expansion

**Problem**: Represent and expand partial date specifications.

**Solution**: Recursive enumeration with backtracking.

#### Implementation

```typescript
// src/operations/longcount-wildcard.ts
class LongCountWildcard {
  run(): LongCount[] {
    // 1. Find wildcard positions
    const wildcardPositions = this.lc.parts
      .map((part, i) => (typeof part === 'number' ? false : i))
      .filter((i) => i !== false);

    // 2. Recursively expand each wildcard
    return wildcardPositions.reduce(
      (potentials, position) => {
        return potentials.flatMap((possible: LongCount) => {
          const range = (position === 1) ? 15 : 20;  // Winal special case
          return Array.from({ length: range }, (_, i) =>
            possible.clone().setDateSections(position, i)
          );
        });
      },
      [this.lc]  // Initial state
    );
  }
}
```

#### Example

```typescript
const partial = new LongCount(9, new Wildcard(), 0, 0, 0);
const wildcard = new LongCountWildcard(partial);
const expanded = wildcard.run();

// Returns: [9.0.0.0.0, 9.1.0.0.0, ..., 9.19.0.0.0]
console.log(expanded.length); // 20 possibilities
```

#### Complexity

- **Single wildcard**: O(range) where range ∈ {15, 20}
- **Multiple wildcards**: O(range₁ × range₂ × ... × rangeₙ)
- **Full wildcard `*.*.*.*.*`**: 20 × 20 × 18 × 20 × 20 = 2,880,000 dates

---

### Pattern: Lazy Linked List

**Problem**: Cycling through calendar dates requires repeated calculations.

**Solution**: Each element pre-calculates and caches its successor, forming a circular linked list.

#### Implementation

```typescript
export default abstract class Cycle {
  private nextHolder: Cycle | null = null;  // Lazy cache

  next(): Cycle {
    return this.shift(1);
  }

  private nextCalculator(): Cycle {
    // Compute once, cache forever
    if (this.nextHolder === null) {
      let newPosition = (this.position + 1) % (this.cycleLength - 1);
      newPosition = (newPosition === 0) ? (this.cycleLength - 1) : newPosition;
      this.nextHolder = this.generator(newPosition) as Cycle;
    }
    return this.nextHolder;
  }

  shift(incremental: number): Cycle {
    if (incremental === 0) return this;
    // Follow the linked chain
    return this.nextCalculator().shift(incremental - 1);
  }
}
```

#### Visualization

```
Pop → Wo → Sip → Sotz' → ... → Kumk'u → Wayeb → (back to Pop)
 ↑                                               ↓
 └───────────────────────────────────────────────┘
```

#### Benefits

- **O(1) next**: First call computes, subsequent calls retrieve
- **O(n) shift**: Linear walk through linked list
- **Memory**: One pointer per instance
- **Lazy**: Links computed only when needed

---

### Pattern: Vigesimal Arithmetic

**Problem**: Long Count uses mixed-radix system (base-18 for Winal, base-20 elsewhere).

**Solution**: Position-aware modulo arithmetic with carry/borrow propagation.

#### Implementation

```typescript
class DistanceNumber {
  /**
   * Get modulus for specific position
   */
  private getModulo(position: number): number {
    return (position === 1) ? 18 : 20;  // Winal is special
  }

  /**
   * Add with carry propagation
   */
  plus(other: DistanceNumber): LongcountAddition {
    return new LongcountAddition(LongCount, this, other);
  }
}

class LongcountAddition {
  run(): LongCount {
    let carry = 0;
    const result = this.aParts.map((aVal, pos) => {
      const bVal = this.bParts[pos];
      const sum = aVal + bVal + carry;
      carry = Math.floor(sum / this.getModulo(pos));
      return sum % this.getModulo(pos);
    });
    
    // Handle final carry
    if (carry > 0) result.push(carry);
    
    return new LongCount(...result);
  }
}
```

#### Why Mixed-Radix?

| Position | Name | Multiplier | Modulo | Days |
|----------|------|------------|--------|------|
| 0 | K'in | 1 | 20 | 1 |
| 1 | Winal | 20 | **18** | 20 |
| 2 | Tun | 360 | 20 | 360 |
| 3 | K'atun | 7,200 | 20 | 7,200 |
| 4 | B'ak'tun | 144,000 | 20 | 144,000 |

The **Tun** (year) = 18 Winal = 360 days (not 400) to approximate the solar year.

---

### Pattern: Type Guard Protocol

**Problem**: TypeScript needs runtime type checking for safe narrowing from `unknown`.

**Solution**: Standardized type guard functions with consistent naming.

#### Protocol

```typescript
// Convention: is<ClassName>(value: unknown): value is ClassName

export function isWildcard(token: unknown): token is Wildcard {
  return token instanceof Wildcard;
}

export function isComment(c: unknown): c is Comment {
  return (c instanceof Comment);
}

export function isPart(o: unknown): o is IPart {
  return (typeof o === 'object' && o !== null 
    && 'equal' in o 
    && typeof (o as IPart).equal === 'function');
}

export function wrapsComment(o: unknown): o is CommentWrapper {
  return (typeof o === 'object' && o !== null)
    && ('setComment' in o)
    && ('appendComment' in o)
    && ('comment' in o)
    && typeof (o as CommentWrapper).setComment === 'function'
    && typeof (o as CommentWrapper).appendComment === 'function'
    && isComment((o as CommentWrapper).comment);
}
```

#### Usage in Type Narrowing

```typescript
function processDate(input: unknown) {
  if (isPart(input)) {
    // TypeScript knows input is IPart here
    const other = /* ... */;
    return input.equal(other);
  }
  throw new Error('Invalid input');
}
```

---

### Pattern: Bidirectional Map

**Problem**: Need fast lookup in both directions (name ↔ index).

**Solution**: Maintain two internal maps synchronized during construction.

#### Implementation

```typescript
// src/structs/hashMap.ts
export default class HashMap {
  private valueToIndex: { [key: string]: number };
  private indexToValue: (string | undefined)[];

  constructor(raw: (undefined | string)[]) {
    this.indexToValue = raw;
    this.valueToIndex = raw.reduce((obj, elem, idx) => {
      if (elem !== undefined) {
        obj[elem] = idx;
      }
      return obj;
    }, {} as { [key: string]: number });
  }

  getValue(index: number): string | undefined {
    return this.indexToValue[index];  // O(1)
  }

  getIndex(value: string): number {
    return this.valueToIndex[value];  // O(1)
  }
}
```

#### Usage

```typescript
const months = new HashMap([
  undefined,      // 0
  'Pop',          // 1
  'Wo',           // 2
  // ... 19 total
]);

months.getIndex('Pop');    // → 1   (O(1))
months.getValue(1);        // → 'Pop' (O(1))
```

---

## Advanced Patterns

### Pattern: Correlation Constants

**Problem**: Multiple scholarly theories for Maya-Gregorian alignment exist.

**Solution**: Pluggable correlation constants with default.

#### Implementation

```typescript
// src/lc/correlation-constant.ts
const correlations: { [key: number]: CorrelationConstant } = {
  584283: new CorrelationConstant(584283),  // GMT (default)
  584285: new CorrelationConstant(584285),  // Modified GMT
  // ... other theories
};

export function getCorrelationConstant(constant: number): CorrelationConstant {
  if (correlations[constant] === undefined) {
    correlations[constant] = new CorrelationConstant(constant);
  }
  return correlations[constant];
}

// Usage
const lc = new LongCount(9, 17, 0, 0, 0);
lc.setCorrelationConstant(getCorrelationConstant(584285));  // Chainable
const gregorian = lc.asGregorian();
```

#### Supported Correlations

| Constant | Name | Description |
|----------|------|-------------|
| 584283 | GMT | Goodman-Martinez-Thompson (default) |
| 584285 | Modified GMT | Alternative correlation |

---

### Pattern: Enum-Based Configuration

**Problem**: Need named constants that are both type-safe and runtime values.

**Solution**: TypeScript enums with string values.

#### Implementation

```typescript
// src/cr/component/haabMonth.ts
export enum HaabMonths {
  POP = 'Pop',
  WO = 'Wo',
  SIP = 'Sip',
  SOTZ = 'Sotz\'',
  // ... 19 total
  WAYEB = 'Wayeb'
}

// Build lookup table from enum
const months: HashMap = new HashMap([
  undefined,
  HaabMonths.POP,
  HaabMonths.WO,
  // ...
]);
```

#### Benefits

- **Type Safety**: Compiler catches typos
- **Autocomplete**: IDE suggests valid values
- **Runtime Values**: Can iterate over enum members
- **Refactoring**: Rename propagates automatically

---

## Anti-Patterns Avoided

### ❌ Avoided: God Object

**Instead**: Clear separation of concerns
- CR handles 52-year cycle
- LC handles absolute chronology
- FullDate composes both
- Operations handle arithmetic

### ❌ Avoided: Anemic Domain Model

**Instead**: Rich domain objects with behavior
- Dates know how to increment themselves
- Dates know how to compare themselves
- Dates know how to convert themselves

### ❌ Avoided: Primitive Obsession

**Instead**: Proper domain types
- Not `string` → `TzolkinDay`
- Not `number` → `NumberCoefficient`
- Not `null` → `Wildcard`

### ❌ Avoided: Implicit Type Coercion

**Instead**: Explicit validation and conversion
- Type guards for narrowing
- Factory methods for parsing
- Clear error messages

---

## Pattern Selection Guide

### When to Use Each Pattern

| Pattern | Use When | Example |
|---------|----------|---------|
| **Singleton** | Immutable objects need identity equality | Date components |
| **Factory** | Complex object creation from strings | Parsing user input |
| **Mixin** | Cross-cutting concern across unrelated classes | Comments on all types |
| **Composite** | Part-whole hierarchies | FullDate = CR + LC |
| **Strategy** | Multiple interchangeable algorithms | Add vs Subtract |
| **Template Method** | Algorithm skeleton with variable steps | Cycle iteration |
| **Type Guard** | Runtime type checking needed | Safe `unknown` handling |

---

## Best Practices Demonstrated

### 1. Prefer Composition Over Inheritance

```typescript
// Good: Composition
class FullDate {
  cr: CalendarRound;  // Has-a relationship
  lc: LongCount;
}

// Not: Deep inheritance hierarchies
```

### 2. Program to Interfaces

```typescript
// All domain objects implement IPart
export interface IPart {
  equal(other: unknown): boolean;
}

// Functions accept interfaces, not concrete types
function compareDates(a: IPart, b: IPart): boolean {
  return a.equal(b);
}
```

### 3. Immutability

```typescript
// Operations return new instances
const lc1 = new LongCount(9, 17, 0, 0, 0);
const lc2 = lc1.plus(new DistanceNumber(0, 0, 1, 0, 0)).run();

// lc1 unchanged, lc2 is new instance
console.log(lc1.toString()); // 9.17.0.0.0
console.log(lc2.toString()); // 9.17.1.0.0
```

### 4. Fail Fast

```typescript
// Validate immediately in constructors
constructor(raw: string | Wildcard) {
  super(raw, months, getHaabMonth);
  this.validate();  // ← Throws if invalid
}
```

### 5. Clear Error Messages

```typescript
throw new Error(`Haab' month (${this.value}) must be in ${months}`);
// Not: throw new Error('Invalid value');
```

---

## Pattern Evolution

### Historical Changes

#### Phase 1: JavaScript Era (2019-2020)
- Loose typing
- Prototype-based patterns
- No type guards

#### Phase 2: TypeScript Migration (2020)
- Added type annotations
- Introduced interfaces
- Basic type safety

#### Phase 3: Modernization (2025-2026)
- Replaced `any` with `unknown`
- Added comprehensive type guards
- Strengthened encapsulation
- Improved immutability guarantees

---

## Conclusion

The `@drewsonne/maya-dates` codebase demonstrates mature application of design patterns:

- **Creational patterns** optimize object lifecycle
- **Structural patterns** organize complex hierarchies
- **Behavioral patterns** encapsulate algorithms
- **Domain patterns** solve calendar-specific challenges

The patterns work together to create a **type-safe, performant, and maintainable** implementation of the complex Maya calendar system.

