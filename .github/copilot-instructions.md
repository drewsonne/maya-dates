# Copilot Instructions for @drewsonne/maya-dates

This document provides context and guidelines for GitHub Copilot when working with this TypeScript library for Maya calendar date manipulation.

## Project Overview

This is a TypeScript library (`@drewsonne/maya-dates`) for working with ancient Maya calendar dates. It provides:
- **Calendar Round (CR)**: 18,980-day cycle combining Tzolkin (260 days) and Haab (365 days)
- **Long Count (LC)**: Base-20 vigesimal system counting days from mythological creation (Aug 11, 3114 BCE)
- **Full Date**: Combination of CR and LC for unique date identification
- Date arithmetic, wildcard support, and conversions to Western calendars

## Repository Structure

```
src/
├── cr/                    # Calendar Round components (Tzolkin, Haab)
├── lc/                    # Long Count and arithmetic
├── factory/               # String parsers for dates
├── operations/            # Date arithmetic and wildcard expansion
├── full-date.ts           # Combined CR + LC dates
├── wildcard.ts            # Partial date support
└── __tests__/             # Test files (*.spec.ts)
```

## Build, Test, and Development Commands

### Building
```bash
npm run build              # Compile TypeScript to JavaScript (src/ → lib/)
npm run build:check        # Type check without emitting files
npm run build:clean        # Clean build directory and rebuild
npm run generate:locales   # Generate i18n locale files from JSON source
```

**Note**: Locale files are auto-generated during `prebuild` (before `npm run build`), ensuring they're always up-to-date before compilation.

### Testing
```bash
npm test                   # Run all tests with Mocha
npm run test:coverage      # Run tests with coverage report (nyc)
```

### Documentation Site
```bash
npm run docs:start         # Start Docusaurus development server
npm run docs:build         # Build documentation website
```

### Node.js Support
- Supports Node.js 20, 22, and 24 (LTS)
- Development on Node 24
- Engine constraint: `>=20.0.0 <25.0.0`

## Coding Conventions

### TypeScript Standards
- **Strict mode**: All strict TypeScript checks enabled (`strict: true`, `noImplicitAny: true`)
- **Prefer `unknown` over `any`**: Use type guards for type narrowing
- **Explicit return types**: All public methods must have explicit return types
- **No implicit any**: All parameters and variables must have types

### Naming Conventions
- **Classes**: PascalCase (`CalendarRound`, `LongCount`, `FullDate`)
- **Functions**: camelCase (`getCalendarRound`, `isWildcard`)
- **Factory Functions**: `get*` prefix for singleton factories (`getTzolkin`, `getHaab`)
- **Type Guards**: `is*` prefix for type guard functions (`isWildcard`, `isPart`, `isComment`)
- **Files**: kebab-case (`calendar-round.ts`, `long-count.ts`)
- **Test Files**: `*.spec.ts` suffix

### Code Style
- **Indentation**: 2 spaces (configured in `.editorconfig`)
- **Line endings**: LF (Unix-style)
- **Trailing whitespace**: Remove
- **Final newline**: Always include
- **Charset**: UTF-8

### Design Patterns

#### Singleton Pattern
All date components use singleton factory functions to ensure:
- Identity-based equality (`===` works correctly)
- Memory efficiency (no duplicate objects)
- Fast comparisons

```typescript
// Always use factory functions, not constructors directly
const cr = getCalendarRound(tzolkin, haab);  // ✅ Correct
const cr = new CalendarRound(tzolkin, haab); // ❌ Avoid (breaks singleton)
```

#### Immutability
All date objects are immutable. Operations return new instances:

```typescript
const nextDate = currentDate.next();      // Returns new instance
const shiftedDate = currentDate.shift(5); // Returns new instance
```

#### Method Chaining
Methods that modify state return `this` for chaining:

```typescript
date.setComment('Initial')
    .appendComment('Additional')
    .resetComment();
```

#### Type Guards
Use type guards for safe type narrowing:

```typescript
if (isWildcard(value)) {
  // TypeScript knows value is Wildcard here
}
```

## Testing Practices

### Test Framework
- **Framework**: Mocha (~11.7)
- **Assertions**: Chai (~4.3)
- **Execution**: ts-node for running TypeScript tests
- **Coverage**: nyc for coverage reports

### Test Patterns
1. **Describe blocks**: Group related tests with `describe()`
2. **Assertion style**: Use Chai's `expect()` style
3. **Table-driven tests**: Use arrays of input/expected pairs for data-driven tests
4. **Round-trip tests**: Parse → render → parse equality checks
5. **Edge cases**: Test boundary values, overflows, wildcards

### Test Example
```typescript
import { expect } from 'chai';
import 'mocha';

describe('Component name', () => {
  it('should describe expected behavior', () => {
    const result = someFunction();
    expect(result).to.equal(expectedValue);
  });
});
```

## Documentation Standards

### JSDoc Comments
All public APIs require JSDoc comments:

```typescript
/**
 * Brief description of the function
 * @param paramName - Description of the parameter
 * @return Description of the return value
 * @example
 * ```typescript
 * const result = myFunction('example');
 * ```
 */
export function myFunction(paramName: string): ReturnType {
  // implementation
}
```

## Development Workflow

### Branch Strategy
- **Main branch**: `main` (production-ready code)
- **Feature branches**: Created from `main` for new features/fixes
- **Commit messages**: Follow [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `chore:` for maintenance tasks
  - `refactor:` for code refactoring

### Pull Request Workflow
1. Create feature branch from `main`
2. Make changes, add tests, update documentation
3. Ensure tests pass: `npm test`
4. Ensure build succeeds: `npm run build`
5. Push and create PR targeting `main`
6. CI runs on Node.js 20.x, 22.x, and 24.x
7. Merge after approval

## Key Concepts

### Domain Model
- **Tzolkin**: 260-day cycle (13 coefficients × 20 day names)
- **Haab**: 365-day approximation (18 months × 20 days + 5 Wayeb)
- **Calendar Round**: Combination of Tzolkin and Haab (18,980-day cycle)
- **Long Count**: Base-20 vigesimal system with mixed radix (base-18 for winal position)
- **Wildcard**: Represents unknown or partial date information (`*`)

### Common Operations
- **Parsing**: Use factory classes (`LongCountFactory`, `CalendarRoundFactory`, `FullDateFactory`)
- **Arithmetic**: `plus()`, `minus()`, `shift()` operations
- **Wildcard expansion**: Generate all valid dates matching a pattern
- **Conversions**: Maya ↔ Gregorian/Julian via Julian Day Number

### Type Guards
Essential type guards to use:
- `isWildcard(value)`: Check if value is a Wildcard
- `isComment(value)`: Check if value is a Comment
- `isPart(value)`: Check if value implements IPart interface
- `wrapsComment(value)`: Check if value extends CommentWrapper

## Dependencies

### Runtime
- `moonbeams` (~2.0): Calendar mathematics utilities

### Development
- `typescript` (^5.9.0): Type system
- `mocha` (~11.7): Test runner
- `chai` (~4.3): Assertions
- `ts-node` (~10.5): TypeScript execution
- `nyc` (~15.1): Coverage reporting

## Critical Workflow Details

### Auto-Generated Locale Files
The i18n locale files in [src/i18n/locales/](src/i18n/locales/) are **auto-generated** and should **never be edited manually**:
- `modern_mayanist.ts` - Modern Mayanist orthography (e.g., Pohp, Ik', Ak'bal)
- `modern_variant.ts` - Modern variant spellings (e.g., Pop, Ik', Ak'bal)  
- `older_16c.ts` - Older 16th century spellings (e.g., Pop, Ik, Akbal)

These files are generated from [src/i18n/data/maya_spellings_sources.json](src/i18n/data/maya_spellings_sources.json) using the script [scripts/generate-locales.ts](scripts/generate-locales.ts).

**To modify spellings**: Edit `maya_spellings_sources.json`, then run:
```bash
npm run generate:locales
```

Each locale file contains a header comment indicating it's auto-generated and includes bibliographic sources.

### Documentation Generation
Documentation is published at https://drewsonne.github.io/maya-dates/ using:
- **Docusaurus** for the main site structure ([website/](website/))
- **TypeDoc** for API reference generation
- Source: [website/docs/](website/docs/)

Build the docs site locally with `npm run docs:start`.

## Additional Resources

- **Architecture**: See [website/docs/architecture.md](website/docs/architecture.md) for detailed architecture documentation
- **Design Patterns**: See [website/docs/design-patterns.md](website/docs/design-patterns.md) for pattern reference
- **Domain Model**: See [website/docs/domain-model.md](website/docs/domain-model.md) for calendar system details
- **Workflow**: See [docs/development/workflow.md](docs/development/workflow.md) for development workflow
- **API Docs**: Published at https://drewsonne.github.io/maya-dates/

## Important Notes

### When suggesting code:
1. ✅ Use factory functions (`getCalendarRound`) instead of constructors for date objects
2. ✅ Add explicit return types to all public methods
3. ✅ Use type guards (`isWildcard`) instead of `instanceof` or type assertions
4. ✅ Maintain immutability - return new instances from operations
5. ✅ Follow the singleton pattern for calendar components
6. ✅ Include tests for new functionality using Mocha/Chai
7. ✅ Add JSDoc comments to public APIs
8. ✅ Use 2-space indentation and follow `.editorconfig` settings

### When working with dates:
- Long Count position 1 (winal) uses base-18, all others use base-20
- Calendar Round repeats every 18,980 days (52 Haab years)
- GMT correlation constant (584283) is most commonly used for conversions
- Wildcards (`*`) represent unknown values in partial dates

### Common pitfalls to avoid:
- ❌ Don't use constructors directly for dates (breaks singleton pattern)
- ❌ Don't mutate date objects (they're immutable)
- ❌ Don't use `any` type (use `unknown` with type guards)
- ❌ Don't forget to test edge cases (wildcards, boundary values)
- ❌ Don't hardcode magic numbers (use named constants)
