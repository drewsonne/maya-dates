/**
 * kebenaran-1-raw-output.mjs — KEBENARAN 1: Raw actual output of all entry functions
 * 
 * This script runs all entry functions directly and saves their raw outputs.
 * This is the ground truth that must not change after refactoring.
 */
import * as entry from './regret-entry.mjs';

const truths = {
  'longcount-from-mdn': [
    { input: 0, output: entry.longCountFromMdn(0) },
    { input: 1872000, output: entry.longCountFromMdn(1872000) },
    { input: 144000, output: entry.longCountFromMdn(144000) },
    { input: 360, output: entry.longCountFromMdn(360) },
    { input: 1, output: entry.longCountFromMdn(1) },
    { input: 1728000, output: entry.longCountFromMdn(1728000) },
    { input: 100, output: entry.longCountFromMdn(100) }
  ],
  'distance-number-normalise': [
    { input: [5, 20, 3, 0, 0], output: entry.distanceNumberNormalise([5, 20, 3, 0, 0]) },
    { input: [0, 18, 0, 0, 0], output: entry.distanceNumberNormalise([0, 18, 0, 0, 0]) },
    { input: [19, 17, 19, 19, 19], output: entry.distanceNumberNormalise([19, 17, 19, 19, 19]) },
    { input: [1, 1, 1, 1, 1], output: entry.distanceNumberNormalise([1, 1, 1, 1, 1]) },
    { input: [0, 0, 0, 0, 1], output: entry.distanceNumberNormalise([0, 0, 0, 0, 1]) }
  ],
  'tzolkin-from-daynumber': [
    { input: 0, output: entry.tzolkinFromDayNumber(0) },
    { input: 1, output: entry.tzolkinFromDayNumber(1) },
    { input: 259, output: entry.tzolkinFromDayNumber(259) },
    { input: 260, output: entry.tzolkinFromDayNumber(260) },
    { input: 13, output: entry.tzolkinFromDayNumber(13) },
    { input: -1, output: entry.tzolkinFromDayNumber(-1) },
    { input: 1000, output: entry.tzolkinFromDayNumber(1000) }
  ],
  'tzolkin-shift': [
    { input: [0, 1], output: entry.tzolkinShift([0, 1]) },
    { input: [0, 260], output: entry.tzolkinShift([0, 260]) },
    { input: [0, -1], output: entry.tzolkinShift([0, -1]) },
    { input: [100, 13], output: entry.tzolkinShift([100, 13]) },
    { input: [0, 7], output: entry.tzolkinShift([0, 7]) }
  ],
  'haab-from-daynumber': [
    { input: 0, output: entry.haabFromDayNumber(0) },
    { input: 1, output: entry.haabFromDayNumber(1) },
    { input: 364, output: entry.haabFromDayNumber(364) },
    { input: 365, output: entry.haabFromDayNumber(365) },
    { input: 100, output: entry.haabFromDayNumber(100) },
    { input: -1, output: entry.haabFromDayNumber(-1) },
    { input: 1872000, output: entry.haabFromDayNumber(1872000) }
  ],
  'haab-shift': [
    { input: [0, 1], output: entry.haabShift([0, 1]) },
    { input: [0, 365], output: entry.haabShift([0, 365]) },
    { input: [0, -1], output: entry.haabShift([0, -1]) },
    { input: [100, 20], output: entry.haabShift([100, 20]) },
    { input: [0, 364], output: entry.haabShift([0, 364]) }
  ],
  'calendar-round-from-lc': [
    { input: 0, output: entry.calendarRoundFromLc(0) },
    { input: 1, output: entry.calendarRoundFromLc(1) },
    { input: 1872000, output: entry.calendarRoundFromLc(1872000) },
    { input: 360, output: entry.calendarRoundFromLc(360) },
    { input: 7200, output: entry.calendarRoundFromLc(7200) },
    { input: 144000, output: entry.calendarRoundFromLc(144000) },
    { input: 100, output: entry.calendarRoundFromLc(100) }
  ],
  'longcount-addition': [
    { input: [1000, 2000], output: entry.longCountAdd([1000, 2000]) },
    { input: [0, 0], output: entry.longCountAdd([0, 0]) },
    { input: [144000, 7200], output: entry.longCountAdd([144000, 7200]) },
    { input: [1, 1], output: entry.longCountAdd([1, 1]) },
    { input: [1872000, 1], output: entry.longCountAdd([1872000, 1]) }
  ]
};

// Write to file
import { writeFileSync } from 'fs';
const timestamp = new Date().toISOString();
const content = JSON.stringify({ captured: timestamp, truths }, null, 2);
writeFileSync('kebenaran-1-raw-output.json', content, 'utf8');
console.log(`KEBENARAN 1 saved: kebenaran-1-raw-output.json (${Object.keys(truths).length} clusters, ${Object.values(truths).flat().length} total input/output pairs)`);
