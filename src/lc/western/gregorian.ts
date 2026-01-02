import WesternCalendar from './western';

/**
 * Offset lookup table: [maxJulianDay, offsetValue]
 * Monotonically increasing as JDN increases (proleptic Gregorian drift from Julian)
 */
const OFFSET_TABLE: ReadonlyArray<readonly [number, number]> = [
  [1455864, -8],
  [1599864, -5],
  [1743864, -2],
  [1887864, 1],
  [2031864, 4],
  [2096664, 6],
  [2175864, 7],
  [2240664, 9],
  [2299160, 10],
] as const;

/**
 * Represent a Gregorian date.
 * @extends {WesternCalendar}
 */
export default class GregorianCalendarDate extends WesternCalendar {
  /**
   * Handle the sliding offset between gregorian and julian dates
   * @return {number}
   */
  get offset(): number {
    // Special case: exact transition point
    if (this.julianDay === 2299160) {
      return 0;
    }

    // Find the first entry where julianDay <= maxJulianDay
    for (const [maxJdn, offsetValue] of OFFSET_TABLE) {
      if (this.julianDay <= maxJdn) {
        return offsetValue;
      }
    }

    // Default for dates beyond table range
    return 0;
  }
}
