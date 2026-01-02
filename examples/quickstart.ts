/**
 * Quickstart example - Basic usage of maya-dates
 * 
 * Run with: npx ts-node examples/quickstart.ts
 */

import { LongCountFactory } from '../src/index';

// Long Count from Initial Series on east side of Stele E, Quirigua
const lc = new LongCountFactory().parse('9.17.0.0.0');
console.log(`${lc.buildFullDate()}`);
// Output: 13 Ajaw 18 Kumk'u  9.17. 0. 0. 0
