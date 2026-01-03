# Architecture Documentation

## Overview

`@drewsonne/maya-dates` is a TypeScript library for working with Maya calendar dates and converting between Maya and Western calendar systems. The library implements the complex mathematics and cyclical patterns of the ancient Maya calendar system.

## System Architecture

### High-Level Structure

```
┌─────────────────────────────────────────────────────────┐
│                    Public API                            │
│  (Factories, Calendar Components, Operations)            │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  Domain Model Layer                      │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────┐ │
│  │ Calendar     │  │  Long Count   │  │  Full Date   │ │
│  │ Round (CR)   │  │     (LC)      │  │   (CR + LC)  │ │
│  └──────────────┘  └───────────────┘  └──────────────┘ │
│         ↓                  ↓                   ↓         │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────┐ │
│  │ Tzolkin(260) │  │ Distance      │  │  Western     │ │
│  │ Haab (365)   │  │   Number      │  │  Calendars   │ │
│  └──────────────┘  └───────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Core Abstractions & Utilities               │
│  Wildcards, Comments, Type Guards, HashMap, IPart       │
└─────────────────────────────────────────────────────────┘
```

## Module Organization

### `/src` Root Structure

```
src/
├── cr/                    # Calendar Round (260 × 365 = 18,980 day cycle)
│   ├── component/        # Atomic calendar components
│   ├── calendar-round.ts # CR composition (Tzolkin + Haab)
│   ├── tzolkin.ts        # 260-day cycle
│   └── haab.ts           # 365-day solar year
│
├── lc/                    # Long Count (base-20 vigesimal system)
│   ├── long-count.ts     # Main LC implementation
│   ├── distance-number.ts# Arithmetic base for LC
│   ├── night/            # Lord of the Night glyphs
│   └── western/          # Conversions to Julian/Gregorian
│
├── factory/               # String parsing → Date objects
│   ├── calendar-round.ts
│   ├── long-count.ts
│   ├── full-date.ts
│   └── gregorian.ts
│
├── operations/            # Date arithmetic & wildcards
│   ├── longcount-addition.ts
│   ├── longcount-subtraction.ts
│   ├── longcount-wildcard.ts
│   └── fulldate-wildcard.ts
│
├── structs/               # Data structures
│   └── hashMap.ts        # Bidirectional map
│
├── full-date.ts           # Combines CR + LC
├── wildcard.ts            # Partial date marker
├── comment.ts             # Metadata annotations
├── comment-wrapper.ts     # Mixin for comments
├── i-part.ts              # Equality interface
└── guards.ts              # Type guards
```

## Design Patterns

### 1. **Singleton Pattern with Factory Functions**

**Purpose**: Ensure identical dates use the same object instance for efficient equality comparisons.

**Implementation**:
```typescript
// Each calendar component maintains a singleton cache
const singleton: { [key: string]: CalendarRound } = {};

export function getCalendarRound(tzolkin: Tzolkin, haab: Haab): CalendarRound {
  const crId = `${tzolkin} ${haab}`;
  if (singleton[crId] === undefined) {
    singleton[crId] = new CalendarRound(tzolkin, haab);
  }
  return singleton[crId];
}
```

**Used in**:
- `getCalendarRound()` - Calendar Round dates
- `getTzolkin()` - Tzolkin (260-day cycle)
- `getHaab()` - Haab (365-day cycle)
- `getHaabMonth()` - Individual Haab months
- `getTzolkinDay()` - Individual Tzolkin days

**Benefits**:
- Identity-based equality (`===`) works correctly
- Reduces memory footprint
- Improves performance for repeated date operations

### 2. **Factory Pattern for Parsing**

**Purpose**: Convert string representations of dates into domain objects.

**Base Class**:
```typescript
export default abstract class Factory {
  pattern: RegExp;
  
  constructor(pattern: RegExp) {
    this.pattern = pattern;
  }
  
  split(raw: string): string[] {
    const matches = raw.match(this.pattern);
    return matches ? matches.slice(1) : [];
  }
  
  // Subclasses implement parse()
}
```

**Concrete Factories**:
- `CalendarRoundFactory` - Parses "4 Ajaw 8 Kumk'u"
- `LongCountFactory` - Parses "9.17.0.0.0"
- `FullDateFactory` - Parses "4 Ajaw 8 Kumk'u 9.17.0.0.0"
- `GregorianFactory` - Parses "1/3/1900 CE"

### 3. **Mixin Pattern for Cross-Cutting Concerns**

**Purpose**: Add comment functionality to any calendar component without inheritance complexity.

**Implementation**:
```typescript
export abstract class CommentWrapper {
  comment: Comment;
  
  setComment(comment: Comment | string): this { /* ... */ }
  appendComment(comment: Comment | string): this { /* ... */ }
  resetComment(): this { /* ... */ }
  commentIsEqual(other: CommentWrapper): boolean { /* ... */ }
}
```

**Benefits**:
- Any domain class can extend `CommentWrapper` to support annotations
- Supports method chaining (returns `this`)
- Used across all major date types (CR, LC, FullDate, Operations)

### 4. **Strategy Pattern for Operations**

**Purpose**: Encapsulate date arithmetic algorithms.

**Base Class**:
```typescript
export default abstract class LongcountOperation extends CommentWrapper implements IPart {
  protected readonly a: DistanceNumber;
  protected readonly b: DistanceNumber;
  protected readonly LcClass: ILongcount;
  
  protected abstract operate(/* ... */): number | Wildcard;
}
```

**Concrete Strategies**:
- `LongcountAddition` - Add two Long Counts
- `LongcountSubtraction` - Subtract Long Counts
- `LongCountWildcard` - Expand wildcard patterns
- `CalendarRoundWildcard` - Expand CR wildcards
- `FullDateWildcard` - Expand full date wildcards

### 5. **Template Method Pattern for Cycles**

**Purpose**: Define the skeleton of cycling algorithms with customizable behavior.

**Base Class**:
```typescript
export default abstract class Cycle extends Base {
  position: number;
  private nextHolder: Cycle | null;
  
  next(): Cycle {
    return this.shift(1);
  }
  
  shift(incremental: number): Cycle {
    if (incremental === 0) return this;
    return this.nextCalculator().shift(incremental - 1);
  }
  
  private nextCalculator(): Cycle { /* singleton-aware */ }
  
  abstract validate(): boolean; // Subclass responsibility
}
```

**Concrete Cycles**:
- `TzolkinDay` - 20 day names
- `HaabMonth` - 19 month names
- `NumberCoefficient` - Numeric positions

### 6. **Composite Pattern for Date Composition**

**Purpose**: Build complex dates from simpler components.

**Hierarchy**:
```
FullDate (CR + LC)
    ├── CalendarRound (Tzolkin + Haab)
    │       ├── Tzolkin (Coefficient + Day)
    │       │       ├── NumberCoefficient (1-13)
    │       │       └── TzolkinDay (20 names)
    │       └── Haab (Coefficient + Month)
    │               ├── NumberCoefficient (0-19)
    │               └── HaabMonth (19 names)
    └── LongCount (...Cycles)
            └── DistanceNumber (base-20 arithmetic)
```

## Core Abstractions

### IPart Interface

The fundamental contract for all date components:

```typescript
export interface IPart {
  equal(other: unknown): boolean;
}
```

**Purpose**: Unified equality comparison across all calendar types.

**Implementers**: All domain objects (CR, LC, FullDate, Operations, Components)

### Wildcard System

**Purpose**: Represent unknown or partial date information.

```typescript
export class Wildcard extends CommentWrapper implements IPart {
  toString(): string { return '*'; }
  equal(other: IPart): boolean { return isWildcard(other); }
}

export function isWildcard(token: unknown): token is Wildcard {
  return token instanceof Wildcard;
}
```

**Usage**:
- Partial dates: `"* Ajaw 8 Kumk'u"` (coefficient unknown)
- Pattern matching: `"4 Ajaw * *"` (haab unknown)
- Wildcard expansion: Generate all valid matching dates

### Type Guard Pattern

**Purpose**: Safe type narrowing with runtime validation.

**Convention**:
```typescript
// Every domain class has a corresponding type guard
export function isWildcard(token: unknown): token is Wildcard
export function isComment(c: unknown): c is Comment
export function isPart(o: unknown): o is IPart
export function wrapsComment(o: unknown): o is CommentWrapper
```

**Benefits**:
- Safer than type assertions
- Works with `unknown` instead of `any`
- Proper TypeScript narrowing

## Key Components

### Calendar Round (CR)

**Represents**: The 18,980-day cycle formed by combining Tzolkin and Haab.

**Structure**:
- **Tzolkin**: 260-day cycle (13 × 20)
  - Coefficient: 1-13 (numeric position)
  - Day: 20 day names (Imix, Ik', Ak'bal, ...)
- **Haab**: 365-day solar approximation (18 × 20 + 5)
  - Coefficient: 0-19 (day number in month)
  - Month: 18 regular months + 5-day Wayeb

**Key Operations**:
- `next()` - Increment by one day
- `shift(n)` - Increment by n days
- `equal()` - Compare dates (identity-based via singletons)
- `diff()` - Calculate distance between dates

### Long Count (LC)

**Represents**: Absolute day count from mythological creation date (0.0.0.0.0 = Aug 11, 3114 BCE).

**Structure**: Base-20 vigesimal number system
- K'in (days): 1
- Winal (months): 20 K'in
- Tun (years): 18 Winal = 360 days
- K'atun: 20 Tun = 7,200 days
- B'ak'tun: 20 K'atun = 144,000 days
- [Higher cycles]: Pictun, Calabtun, K'inchiltun, Alautun

**Key Features**:
- Arithmetic operations (add, subtract)
- Conversion to Julian Day Number
- Conversion to Gregorian/Julian calendars
- Lord of the Night glyph calculation
- Wildcard expansion

### Full Date

**Represents**: Complete Maya date specification (CR + LC).

**Purpose**: Unique date identification. The Calendar Round repeats every 52 years, but combining it with the Long Count creates a unique identifier.

**Example**: `4 Ajaw 8 Kumk'u 9.17.0.0.0`

## Common Code Patterns

### Pattern 1: Linked List for Cycles

**Purpose**: Avoid recomputation when iterating through cycles.

```typescript
export default abstract class Cycle extends Base {
  private nextHolder: Cycle | null;  // Cached next element
  
  next(): Cycle {
    return this.shift(1);
  }
  
  private nextCalculator(): Cycle {
    if (this.nextHolder === null) {
      // Compute once, cache result
      this.nextHolder = /* compute next */;
    }
    return this.nextHolder;
  }
}
```

**Benefits**:
- Each cycle element knows its successor
- Forms an implicit circular linked list
- Eliminates repeated modulo calculations

### Pattern 2: Bidirectional HashMap

**Purpose**: Fast lookup by index or by value.

```typescript
export default class HashMap {
  private valueToIndex: { [key: string]: number };
  private indexToValue: (string | undefined)[];
  
  getValue(index: number): string | undefined;
  getIndex(value: string): number;
}
```

**Used for**:
- Tzolkin day names ↔ positions
- Haab month names ↔ positions
- Constant-time lookups in both directions

### Pattern 3: Immutable Operations

**Convention**: Date objects are immutable; operations return new instances.

```typescript
class CalendarRound {
  next(): CalendarRound {
    return getCalendarRound(
      this.tzolkin.next(),
      this.haab.next()
    );
  }
  
  shift(n: number): CalendarRound {
    // Returns new instance via singleton factory
  }
}
```

**Benefits**:
- Thread-safe
- Predictable behavior
- Easy to reason about
- Singleton pattern ensures efficiency

### Pattern 4: Method Chaining for Fluent APIs

**Convention**: Mutating methods return `this` for chaining.

```typescript
class CommentWrapper {
  setComment(comment: Comment | string): this {
    this.comment = /* ... */;
    return this;
  }
  
  appendComment(comment: Comment | string): this {
    this.comment = /* ... */;
    return this;
  }
  
  resetComment(): this {
    this.comment = new Comment('');
    return this;
  }
}

// Usage:
date.setComment('Initial')
    .appendComment('Additional')
    .resetComment();
```

### Pattern 5: Enum-Driven Configuration

**Pattern**: Use TypeScript enums for named constants.

```typescript
export enum HaabMonths {
  POP = 'Pop',
  WO = 'Wo',
  SIP = 'Sip',
  // ... 19 total
}

export enum TzolkinDays {
  IMIX = 'Imix',
  IK = 'Ik\'',
  // ... 20 total
}
```

**Benefits**:
- Type-safe string constants
- Autocomplete support
- Prevents typos

### Pattern 6: Recursive Wildcard Expansion

**Pattern**: Generate all valid dates matching a wildcard pattern.

```typescript
class LongCountWildcard {
  run(): LongCount[] {
    return this.lc.parts
      .map((part, i) => (typeof part === 'number' ? false : i))
      .filter((i) => i !== false)
      .reduce((potentials, position) => {
        return potentials.reduce((acc: LongCount[], possible: LongCount) => {
          let range = (position === 1) ? 15 : 20; // Winal vs others
          return Array(range).fill(undefined)
            .map((_, i) => possible.clone().setDateSections(position, i))
            .concat(acc);
        }, []);
      }, [this.lc]);
  }
}
```

**Process**:
1. Find wildcard positions
2. For each wildcard, generate all valid values
3. Create cartesian product of all possibilities
4. Return array of fully-qualified dates

### Pattern 7: Correlation Constants

**Pattern**: Configurable alignment between Maya and Western calendars.

```typescript
const correlations: { [key: number]: CorrelationConstant } = {
  584283: new CorrelationConstant(584283),
  584285: new CorrelationConstant(584285),
  // ... other proposed correlations
};

export function getCorrelationConstant(constant: number): CorrelationConstant {
  if (correlations[constant] === undefined) {
    correlations[constant] = new CorrelationConstant(constant);
  }
  return correlations[constant];
}
```

**Most Common**: GMT (584283) - Goodman-Martinez-Thompson correlation

## Domain Model

### Calendar Round Components

```typescript
// Tzolkin: 260-day cycle (13 coefficients × 20 days)
class Tzolkin {
  coeff: NumberCoefficient | WildcardCoefficient;  // 1-13 or *
  day: TzolkinDay | Wildcard;                      // Imix-Ajaw or *
}

// Haab: 365-day approximation (18 months × 20 days + 5 Wayeb)
class Haab {
  coeff: NumberCoefficient | WildcardCoefficient;  // 0-19 or *
  month: HaabMonth | Wildcard;                     // Pop-Wayeb or *
}

// Calendar Round: Combination of both
class CalendarRound {
  tzolkin: Tzolkin;
  haab: Haab;
  
  // Repeats every 18,980 days (52 Haab years)
}
```

### Long Count Components

```typescript
// Base-20 vigesimal number system
class LongCount extends DistanceNumber {
  parts: (number | Wildcard)[];  // [b'ak'tun, k'atun, tun, winal, k'in]
  
  // Example: 9.17.0.0.0
  // = 9 × 144,000 + 17 × 7,200 + 0 + 0 + 0
  // = 1,296,000 + 122,400 = 1,418,400 days
}

// Distance Number: Supports arithmetic
class DistanceNumber {
  parts: (number | Wildcard)[];
  sign: number;  // +1 or -1
  
  plus(other: DistanceNumber): LongcountAddition;
  minus(other: DistanceNumber): LongcountSubtraction;
}
```

## Data Flow

### Parsing Flow

```
User String → Factory.parse()
              ↓
          Factory.split() (regex extraction)
              ↓
          Component constructors
              ↓
          Singleton lookup (if applicable)
              ↓
          Domain object
```

### Arithmetic Flow

```
Date A + Distance → Operation Object (LongcountAddition)
                    ↓
                Operation.run()
                    ↓
                Component arithmetic
                    ↓
                New Date (via singleton)
```

### Wildcard Expansion Flow

```
Partial Date → Wildcard Operator
               ↓
           Find wildcard positions
               ↓
           Generate valid values (recursive)
               ↓
           Cartesian product
               ↓
           Array of complete dates
```

## Key Algorithms

### 1. Calendar Round Cycling

**Challenge**: Tzolkin (260) and Haab (365) have coprime lengths.

**Solution**: Cycle both independently; they sync every LCM(260, 365) = 18,980 days.

```typescript
next(): CalendarRound {
  return getCalendarRound(
    this.tzolkin.next(),  // 260-day cycle
    this.haab.next()      // 365-day cycle
  );
}
```

### 2. Long Count Arithmetic

**Challenge**: Mixed-radix system (base-18 for tun, base-20 elsewhere).

**Solution**: Carry/borrow propagation with position-aware moduli.

```typescript
// Position 1 (winal) uses modulo 18, others use modulo 20
const modulo = (position === 1) ? 18 : 20;
newValue = (oldValue + delta) % modulo;
carry = Math.floor((oldValue + delta) / modulo);
```

### 3. Gregorian ↔ Long Count Conversion

**Challenge**: Different calendar systems with leap years.

**Solution**: Use Julian Day Number as intermediate.

```
Maya LC → Julian Day Number → Gregorian Date
        (correlation constant)
```

## Type Safety Features

### 1. Strict Type Guards

```typescript
// Replace `any` with `unknown` + narrowing
export function isPart(o: unknown): o is IPart {
  return (typeof o === 'object' && o !== null 
    && 'equal' in o 
    && typeof (o as IPart).equal === 'function');
}
```

### 2. Discriminated Unions

```typescript
// Components can be concrete values or wildcards
type CoefficientType = NumberCoefficient | WildcardCoefficient;
type DayType = TzolkinDay | Wildcard;
type MonthType = HaabMonth | Wildcard;
```

### 3. Explicit Return Types

```typescript
// All public methods have explicit return types
setComment(comment: Comment | string): this
next(): CalendarRound
shift(n: number): CalendarRound
equal(other: unknown): boolean
```

## Performance Optimizations

### 1. **Singleton Caching**
- Prevents duplicate object creation
- Identity comparison via `===`
- Memory efficient for repeated dates

### 2. **Lazy Evaluation**
- `nextHolder` cache in Cycle
- Computed only when accessed
- Recursive shift reuses cache

### 3. **Linked List Structure**
- Each cycle element pre-links to successor
- O(1) next operation
- Eliminates modulo arithmetic for sequential access

### 4. **HashMap Bidirectional Lookup**
- O(1) name → index
- O(1) index → name
- Pre-computed during initialization

## Extension Points

### Adding New Calendar Systems

1. Extend `CommentWrapper` and implement `IPart`
2. Create factory for parsing
3. Add conversion methods to/from Julian Day
4. Register singleton pattern if applicable

### Adding New Operations

1. Extend `LongcountOperation` or create standalone
2. Implement `equal()` method
3. Add `run()` or `operate()` method
4. Export via `operations/index.ts`

### Adding Wildcard Support

1. Accept `Wildcard` in component types
2. Check `isWildcard()` before operations
3. Create corresponding `*Wildcard` operator class
4. Implement `run()` for expansion

## Testing Strategy

### Test Organization

```
src/__tests__/
├── cr/              # Calendar Round tests
│   ├── calendar-round.spec.ts
│   ├── haab.spec.ts
│   └── tzolkin.spec.ts
├── lc/              # Long Count tests
│   └── long-count.spec.ts
├── operations/      # Arithmetic tests
└── wildcards.spec.ts
```

### Test Patterns

1. **Table-Driven Tests**: Arrays of input/expected pairs
2. **Round-Trip Tests**: Parse → render → parse equality
3. **Edge Case Tests**: Boundary values, overflows, wildcards
4. **Regression Tests**: Fixed bugs with dedicated test cases

## Dependencies

### Runtime

- `moonbeams` (~2.0) - Calendar mathematics utilities

### Development

- `typescript` (^5.9.0) - Type system
- `mocha` (~11.7) - Test runner
- `chai` (~4.3) - Assertions
- `ts-node` (~10.5) - TypeScript execution
- `nyc` (~15.1) - Coverage reporting
- `typedoc` (^0.28.15) - API documentation

## Build & Distribution

### Compilation

```bash
tsc -p tsconfig.json  # Compiles src/ → lib/
```

**Output**: CommonJS modules in `lib/` with TypeScript declarations

### Module Format

- **Target**: ES5 for broad compatibility
- **Module System**: CommonJS (Node.js standard)
- **Declarations**: `.d.ts` files for TypeScript consumers
- **Source Maps**: Generated for debugging

### Published Artifacts

```
lib/                 # Compiled JavaScript
lib/**/*.d.ts        # TypeScript definitions
README.md            # Documentation
LICENSE              # MIT License
package.json         # Package metadata
```

## Code Quality Standards

### TypeScript

- `strict: true` - All strict checks enabled
- `noImplicitAny: true` - No implicit any types
- `skipLibCheck: true` - Skip external `.d.ts` validation
- Prefer `unknown` over `any`
- Explicit return types on public methods

### Naming Conventions

- **Classes**: PascalCase (`CalendarRound`, `LongCount`)
- **Functions**: camelCase (`getCalendarRound`, `isWildcard`)
- **Factory Functions**: `get*` prefix (`getTzolkin`, `getHaab`)
- **Type Guards**: `is*` prefix (`isWildcard`, `isPart`)
- **Files**: kebab-case (`calendar-round.ts`, `long-count.ts`)

### Documentation

- JSDoc comments on all public APIs
- `@param` tags for parameters
- `@return` tags for return values
- `@example` blocks for usage
- `@ignore` for internal functions

## Future Considerations

### Potential Improvements

1. **ESM Support**: Add ES modules alongside CommonJS
2. **Tree Shaking**: Optimize for modern bundlers
3. **Locale Support**: i18n for day/month names
4. **Date Ranges**: Efficient period representations
5. **Timezone Handling**: Explicit timezone support for conversions
6. **Performance**: Benchmark and optimize critical paths

### Architectural Decisions

#### Why Singletons?

**Pros**:
- Fast equality via `===`
- Memory efficient
- Natural fit for immutable dates

**Cons**:
- Global state
- Testing complexity
- Memory retention

**Decision**: Benefits outweigh costs for this use case (date comparison is frequent)

#### Why Mixed Inheritance + Composition?

- **Inheritance**: For "is-a" relationships (HaabMonth **is a** Cycle)
- **Composition**: For "has-a" relationships (CalendarRound **has a** Tzolkin)
- **Mixins**: For cross-cutting concerns (CommentWrapper)

#### Why CommonJS?

- Maximum compatibility with Node.js ecosystem
- Simpler build process
- Wide tool support

**Future**: Add ESM exports via `package.json` `exports` field without breaking CommonJS users

## Conclusion

The `@drewsonne/maya-dates` library follows a clean architecture with:
- **Clear separation of concerns** (components, factories, operations)
- **Proven design patterns** (Singleton, Factory, Strategy, Template Method)
- **Type safety** (strict TypeScript, type guards)
- **Immutability** (all operations return new instances)
- **Performance optimizations** (caching, linked lists, singletons)

The codebase is well-structured for both **maintainability** (clear modules, consistent patterns) and **extensibility** (abstract base classes, interfaces, factory functions).

