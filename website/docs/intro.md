---
sidebar_position: 1
---

# Getting Started

**@drewsonne/maya-dates** is a TypeScript library for working with ancient Maya calendar dates.

## Installation

```bash
npm install @drewsonne/maya-dates
```

## Quick Start

```typescript
import { LongCountFactory } from '@drewsonne/maya-dates';

// Long Count from Initial Series on east side of Stele E, Quirigua
const lc = new LongCountFactory().parse('9.17.0.0.0');
console.log(`${lc.buildFullDate()}`);
// Output: 13 Ajaw 18 Kumk'u  9.17. 0. 0. 0
```

## What's Included

This library provides:

- **Calendar Round (CR)**: 18,980-day cycle combining Tzolkin (260 days) and Haab (365 days)
- **Long Count (LC)**: Base-20 vigesimal system counting days from mythological creation (Aug 11, 3114 BCE)
- **Full Date**: Combination of CR and LC for unique date identification
- Date arithmetic, wildcard support, and conversions to Western calendars

## Node.js Support

This library supports Node.js versions 20, 22, and 24 (LTS).

## Next Steps

- Read the [Usage Guide](./usage.md) for common patterns
- Explore the [Domain Model](./domain-model.md) to understand Maya calendar systems
- Check the [API Reference](../api) for detailed documentation

