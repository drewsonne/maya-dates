/**
 * Example: Working with Wildcards
 * 
 * Run with: npx ts-node examples/wildcards.ts
 */

import { 
  LongCountFactory, 
  CalendarRoundFactory,
  isWildcard,
  Wildcard
} from '../src/index';

// Create a partial Long Count with a wildcard
const partialLc = new LongCountFactory().parse('9.17.0.0.*');

console.log('Working with Wildcards:');
console.log(`  Partial Long Count: ${partialLc}`);

// Check if a component is a wildcard
if (isWildcard(partialLc.kIn)) {
  console.log('  ✓ The k\'in position is a wildcard');
}

// Create a partial Calendar Round with wildcards
const partialCr = new CalendarRoundFactory().parse('13 Ajaw * Kumk\'u');
console.log(`\n  Partial Calendar Round: ${partialCr}`);

if (isWildcard(partialCr.haab.coeff)) {
  console.log('  ✓ The Haab coefficient is a wildcard');
}

// Create a standalone wildcard
const wildcard = new Wildcard();
console.log(`\n  Standalone wildcard: ${wildcard}`);
console.log(`  Is wildcard: ${isWildcard(wildcard)}`);

// Note: To expand wildcards to get all possible dates, use WildcardExpansion
// from the operations module (see operations example)
