import WesternCalendar from './western';

/**
 * Offset lookup table: [startJulianDay, offsetValue]
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
 * - The boundaries below correspond to dates where the offset value changes or begins
 *
 * Each entry represents: "from this JDN onwards (until the next entry), use this offset"
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
  [1903742, 2],   // 500 CE (March 1)
  [1940267, 3],   // 600 CE (March 1)
  [1976792, 4],   // 700 CE (March 1) - stays 4 through 800
  [2049842, 5],   // 900 CE (March 1)
  [2086367, 6],   // 1000 CE (March 1)
  [2122892, 7],   // 1100 CE (March 1)
  [2195942, 8],   // 1300 CE (March 1) - stays 8 through 1200 (divisible by 400)
  [2232467, 9],   // 1400 CE (March 1)
  [2268991, 10],  // ~1500 CE (Feb 28/29) - offset increases when Julian has Feb 29 but Gregorian doesn't
  [2299160, 0],   // Oct 4, 1582 - Gregorian calendar adoption (offset becomes 0)
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
    // Find the appropriate offset by searching for the table entry
    // where the JDN is >= the entry's start JDN but < the next entry's start JDN
    let currentOffset = 0;  // Default for dates before the first table entry
    
    for (const [startJdn, offsetValue] of OFFSET_TABLE) {
      if (this.julianDay >= startJdn) {
        // This entry applies to our JDN
        currentOffset = offsetValue;
      } else {
        // We've passed our JDN, stop searching
        break;
      }
    }

    return currentOffset;
  }
}
