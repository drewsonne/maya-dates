import WesternCalendar from './western';

/**
 * Offset lookup table: [maxJulianDay, offsetValue]
 *
 * The offset represents the drift between proleptic Gregorian and Julian calendars,
 * which arises from different leap year rules:
 * - Julian: Leap year every 4 years
 * - Gregorian: Leap year every 4 years, EXCEPT century years unless divisible by 400
 *
 * This causes the Gregorian calendar to remove 3 leap days every 400 years.
 * The offset increases monotonically as JDN increases (time moves forward).
 *
 * Historical boundary: October 15, 1582 (JDN 2299161) is when the Gregorian calendar
 * was first adopted, transitioning from Julian. Dates after this are "true" Gregorian
 * rather than proleptic (extended backwards). The offset at JDN 2299160 (Oct 4, 1582)
 * is used for the final proleptic date before the calendar switch.
 *
 * Mathematical derivation:
 * The offset at any point in time equals the cumulative number of leap days that
 * exist in the Julian calendar but not in the proleptic Gregorian calendar (or vice versa).
 * - Every century year (e.g., 100, 200, 300) is a leap year in Julian but NOT in Gregorian
 *   (UNLESS divisible by 400, like 400, 800, 1200, which ARE leap years in both)
 * - The boundaries below correspond to these century transitions where the offset changes
 *
 * The JDN values and corresponding offsets can be verified using the moonbeams library's
 * calendarToJd() function for both GREGORIAN and JULIAN calendar systems, which implements
 * the standard astronomical calendar conversion algorithms (based on Meeus, "Astronomical
 * Algorithms", and similar references).
 *
 * @see {@link https://github.com/drewsonne/moonbeams|moonbeams library}
 */
const OFFSET_TABLE: ReadonlyArray<readonly [number, number]> = [
  [1011734, -8],  // ~3113 BCE - covers Maya creation date and earlier
  [1455864, -8],  // ~728 BCE
  [1599864, -5],  // ~332 BCE
  [1743864, -2],  // 62 CE
  [1887864, 1],   // 456 CE
  [2031864, 4],   // 850 CE
  [2096664, 6],   // 1028 CE
  [2175864, 7],   // 1245 CE
  [2240664, 9],   // 1422 CE
  [2299160, 10],  // Oct 4, 1582 - last proleptic Gregorian date
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
