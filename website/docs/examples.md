---
sidebar_position: 3
title: Examples
---

# Examples

This directory contains runnable examples demonstrating how to use the `@drewsonne/maya-dates` library.

## Running Examples

All examples can be run using `ts-node`:

```bash
# Install dependencies first (from project root)
npm install

# Run any example
npx ts-node examples/quickstart.ts
npx ts-node examples/parsing.ts
npx ts-node examples/gregorian-conversion.ts
npx ts-node examples/wildcards.ts
npx ts-node examples/arithmetic.ts
npx ts-node examples/manual-construction.ts
```

## Example Descriptions

### quickstart.ts
Basic usage showing how to parse a Long Count date and display it as a Full Date.

### parsing.ts
Demonstrates parsing different Maya date formats:
- Long Count dates
- Calendar Round dates
- Full Dates (Calendar Round + Long Count)

### gregorian-conversion.ts
Shows how to convert between Gregorian calendar dates and Maya Long Count:
- Gregorian to Julian Day Number
- Long Count to Gregorian
- Historical date examples

### wildcards.ts
Working with partial or unknown dates using wildcards:
- Creating partial dates with `*`
- Checking if components are wildcards
- Using the `isWildcard()` type guard

### arithmetic.ts
Date arithmetic operations:
- Adding days to dates with `shift()`
- Subtracting days
- Building Full Dates from Long Counts
- Chaining operations

### manual-construction.ts
Manually constructing Maya dates without parsing:
- Building Calendar Round dates component by component
- Creating Long Count dates with explicit values
- Combining them into Full Dates

## Using Examples as Templates

These examples can serve as templates for your own code. The import patterns shown here use modern ES6 named imports from the package root, which is the recommended approach for all new code.
