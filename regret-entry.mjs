/**
 * regret-entry.mjs — Pure function wrappers for maya-dates regression testing
 *
 * Refactored version with extracted helpers to reduce duplication while
 * preserving identical behavioral output for all 8 clusters.
 *
 * Changes:
 * - Extracted `lcSnapshot()` helper to serialize LongCount/DistanceNumber
 * - Extracted `calendarPartSnapshot()` helper for Tzolk'in/Haab' serialization
 * - Extracted `shiftSnapshot()` helper for shift operations
 * - Removed unused imports (getTzolkin, getHaab, CalendarRound, getCalendarRound, etc.)
 * - All behavioral contracts remain IDENTICAL — same input → same output
 */
import {
  LongCount,
  DistanceNumber,
  Tzolkin,
  Haab
} from './lib/index.js';

// ─── Shared serialization helpers ─────────────────────────────────────

/**
 * Serialize a LongCount or DistanceNumber into a plain object snapshot.
 * Captures the string representation, position (total days), and parts array.
 */
function lcSnapshot(obj) {
  return {
    toString: obj.toString(),
    position: obj.getPosition(),
    parts: [...obj.parts]
  };
}

/**
 * Serialize a Tzolk'in or Haab' calendar component into a plain object.
 * Captures the coefficient value, name, and full string representation.
 */
function calendarPartSnapshot(part) {
  return {
    coeff: part.coeff.value,
    name: part.name,
    toString: part.toString()
  };
}

/**
 * Serialize the result of a calendar shift operation.
 * Returns both original and shifted snapshots.
 */
function shiftSnapshot(original, shifted) {
  return {
    original: calendarPartSnapshot(original),
    shifted: calendarPartSnapshot(shifted)
  };
}

// ─── Cluster 1: Long Count from Maya Day Number ────────────────────────

/**
 * Convert a Maya Day Number to Long Count string representation.
 * Exercises the mixed-radix decomposition algorithm.
 */
export function longCountFromMdn(mayanDayNumber) {
  return lcSnapshot(LongCount.fromMayanDayNumber(mayanDayNumber));
}

// ─── Cluster 2: Distance Number Normalise ──────────────────────────────

/**
 * Normalise a Distance Number (handle carry/borrow in mixed-radix).
 * Input: array of parts [k'in, winal, tun, k'atun, bak'tun]
 */
export function distanceNumberNormalise(parts) {
  const dn = new DistanceNumber(...parts);
  dn.normalise();
  return lcSnapshot(dn);
}

// ─── Cluster 3: Tzolk'in from Day Number ───────────────────────────────

/**
 * Convert a Maya Day Number to Tzolk'in date.
 * Exercises the adjusted modulus formula for the 260-day cycle.
 */
export function tzolkinFromDayNumber(dayNumber) {
  return calendarPartSnapshot(Tzolkin.fromDayNumber(dayNumber));
}

// ─── Cluster 4: Tzolk'in Shift ─────────────────────────────────────────

/**
 * Shift a Tzolk'in date by N days.
 * Input: [dayNumber, shiftAmount]
 */
export function tzolkinShift([dayNumber, shiftAmount]) {
  const tz = Tzolkin.fromDayNumber(dayNumber);
  return shiftSnapshot(tz, tz.shift(shiftAmount));
}

// ─── Cluster 5: Haab' from Day Number ──────────────────────────────────

/**
 * Convert a Maya Day Number to Haab' date.
 * Exercises the 365-day vague year cycle formula.
 */
export function haabFromDayNumber(dayNumber) {
  return calendarPartSnapshot(Haab.fromDayNumber(dayNumber));
}

// ─── Cluster 6: Haab' Shift ────────────────────────────────────────────

/**
 * Shift a Haab' date by N days.
 * Input: [dayNumber, shiftAmount]
 */
export function haabShift([dayNumber, shiftAmount]) {
  const h = Haab.fromDayNumber(dayNumber);
  return shiftSnapshot(h, h.shift(shiftAmount));
}

// ─── Cluster 7: Calendar Round from Long Count ─────────────────────────

/**
 * Build a Calendar Round from a Long Count position.
 * Combines Tzolk'in (260-day) + Haab' (365-day) cycles.
 */
export function calendarRoundFromLc(mayanDayNumber) {
  const cr = LongCount.fromMayanDayNumber(mayanDayNumber).buildCalendarRound();
  return {
    tzolkin: cr.tzolkin.toString(),
    haab: cr.haab.toString(),
    toString: cr.toString()
  };
}

// ─── Cluster 8: Long Count Addition ────────────────────────────────────

/**
 * Add two Long Count dates.
 * Input: [mdn1, mdn2] — two Maya Day Numbers
 */
export function longCountAdd([mdn1, mdn2]) {
  const lc1 = LongCount.fromMayanDayNumber(mdn1);
  const lc2 = LongCount.fromMayanDayNumber(mdn2);
  const result = lc1.plus(lc2).equals();
  return {
    lc1: lc1.toString(),
    lc2: lc2.toString(),
    sum: result.toString(),
    position: result.getPosition()
  };
}
