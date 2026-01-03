import FullDate from '../full-date';
import JulianCalendarDate from './western/julian';
import DistanceNumber from './distance-number';
import {LordOfTheNight, lords} from "./night/lord-of-night";
import {Wildcard, isWildcard} from "../wildcard";
import {CorrelationConstant, getCorrelationConstant} from "./correlation-constant";
import {origin} from "../cr/calendar-round";
import LongcountAddition from "../operations/longcount-addition";
import LongcountSubtraction from "../operations/longcount-subtraction";
import GregorianCalendarDate from "./western/gregorian";
import {IPart} from "../i-part";
import * as moonbeams from "moonbeams";

/**
 * Long Count cycle.
 * 
 * The Long Count is a mixed-radix numeral system used by the ancient Maya to track
 * days elapsed since a creation-era base date. This implementation uses the standard
 * epoch per scholarly literature [R1, R2]:
 * 
 * **Epoch (Maya Day Number (MDN) = 0): 13.0.0.0.0 4 Ajaw 8 Kumk'u**
 * 
 * This date represents the completion of the 13th bak'tun in Maya cosmology and serves
 * as the anchor for all Long Count calculations and correlation with Western calendars.
 * MDN is analogous to Julian Day Number, but for the Maya calendar system.
 * 
 * **Units (mixed-radix system):**
 * - 1 k'in = 1 day
 * - 1 winal = 20 k'in
 * - 1 tun = 18 winal = 360 days
 * - 1 k'atun = 20 tun = 7,200 days
 * - 1 bak'tun = 20 k'atun = 144,000 days
 * 
 * @see Reingold, Dershowitz, & Clamen (1993) [R1]
 * @see Martin & Skidmore (2012) [R2]
 */
export default class LongCount extends DistanceNumber {

  static fromDistanceNumber(dn: DistanceNumber): LongCount {
    return new LongCount(...dn.parts)
  }

  /**
   * Create a Long Count from a Gregorian date.
   * 
   * Accepts JavaScript Date objects, ISO 8601 date strings, or GregorianCalendarDate
   * objects and converts them to the corresponding Maya Long Count date using the 
   * specified correlation constant. The default correlation (584283, original GMT) 
   * is used unless specified otherwise.
   * 
   * Supports various ISO 8601 formats:
   * - "YYYY-MM-DD" (e.g., "2012-12-21")
   * - "YYYY-MM-DDTHH:mm:ss" (e.g., "2012-12-21T00:00:00")
   * - "YYYY-MM-DDTHH:mm:ss.sssZ" (e.g., "2012-12-21T00:00:00.000Z")
   * - "YYYY-MM-DDTHH:mm:ss±HH:mm" (e.g., "2012-12-21T00:00:00-05:00")
   * 
   * @param gregorian - JavaScript Date object, ISO 8601 date string, or GregorianCalendarDate
   * @param correlation - Correlation constant for alignment (default: 584283 GMT)
   * @return A Long Count instance representing the same date
   * @throws {Error} If the date is invalid or results in a negative Maya Day Number
   * @example
   * ```typescript
   * // From JavaScript Date object
   * const date = new Date('2012-12-21');
   * const lc1 = LongCount.fromGregorian(date);
   * console.log(lc1.toString()); // "13. 0. 0. 0. 0"
   * 
   * // From ISO 8601 string
   * const lc2 = LongCount.fromGregorian('2012-12-21');
   * console.log(lc2.toString()); // "13. 0. 0. 0. 0"
   * 
   * // From ISO 8601 datetime string
   * const lc3 = LongCount.fromGregorian('2012-12-21T00:00:00Z');
   * console.log(lc3.toString()); // "13. 0. 0. 0. 0"
   * 
   * // From GregorianCalendarDate object
   * const gregorianFactory = new GregorianFactory();
   * const gregorianDate = gregorianFactory.parse('21/12/2012 CE');
   * const lc4 = LongCount.fromGregorian(gregorianDate);
   * console.log(lc4.toString()); // "13. 0. 0. 0. 0"
   * ```
   */
  static fromGregorian(
    gregorian: Date | string | GregorianCalendarDate,
    correlation: CorrelationConstant = getCorrelationConstant(584283)
  ): LongCount {
    // Handle GregorianCalendarDate object
    if (gregorian instanceof GregorianCalendarDate) {
      return LongCount.fromJulianDay(gregorian.julianDay, correlation);
    }

    let date: Date;

    // Handle Date object
    if (gregorian instanceof Date) {
      if (isNaN(gregorian.getTime())) {
        throw new Error('Invalid Date object');
      }
      date = gregorian;
    }
    // Handle ISO 8601 string
    else if (typeof gregorian === 'string') {
      if (gregorian.trim().length === 0) {
        throw new Error('Date string must be a non-empty string');
      }
      
      date = new Date(gregorian);
      
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date string: "${gregorian}"`);
      }
    }
    else {
      throw new Error('fromGregorian() accepts Date objects, ISO 8601 date strings, or GregorianCalendarDate objects');
    }

    // Extract year, month (1-12), day from Date object
    // Note: Date.getMonth() returns 0-11, so we add 1
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Convert to Julian Day Number using moonbeams
    const julianDay = Math.ceil(moonbeams.calendarToJd(year, month, day));

    return LongCount.fromJulianDay(julianDay, correlation);
  }

  /**
   * Create a Long Count from a Julian Day Number.
   * 
   * Converts a Julian Day Number to the corresponding Maya Long Count date using
   * the specified correlation constant. The Maya Day Number (MDN) is calculated
   * as: MDN = JDN - correlation_constant.
   * 
   * @param julianDay - The Julian Day Number to convert
   * @param correlation - Correlation constant for alignment (default: 584283 GMT)
   * @return A Long Count instance representing the same date
   * @throws {Error} If the resulting Maya Day Number is negative
   * @example
   * ```typescript
   * const lc = LongCount.fromJulianDay(2456283);
   * console.log(lc.toString()); // "13. 0. 0. 0. 0"
   * ```
   */
  static fromJulianDay(
    julianDay: number,
    correlation: CorrelationConstant = getCorrelationConstant(584283)
  ): LongCount {
    const mayanDayNumber = julianDay - correlation.value;
    if (mayanDayNumber < 0) {
      throw new Error(`Maya Day Number must be non-negative. Got ${mayanDayNumber} (JDN ${julianDay} - correlation ${correlation.value})`);
    }
    return LongCount.fromMayanDayNumber(mayanDayNumber, correlation);
  }

  /**
   * Create a Long Count from a Maya Day Number (days since 0.0.0.0.0).
   * 
   * Converts a Maya Day Number (total days elapsed since the creation date)
   * into the corresponding Long Count notation using the mixed-radix system:
   * - k'in (base 20)
   * - winal (base 18)
   * - tun, k'atun, bak'tun (base 20)
   * 
   * @param mayanDayNumber - Days elapsed since 0.0.0.0.0 (must be non-negative)
   * @param correlation - Optional correlation constant to set on the result
   * @return A Long Count instance representing the date
   * @throws {Error} If mayanDayNumber is negative
   * @example
   * ```typescript
   * const lc = LongCount.fromMayanDayNumber(1872000); // 13.0.0.0.0
   * console.log(lc.toString()); // "13. 0. 0. 0. 0"
   * ```
   */
  static fromMayanDayNumber(
    mayanDayNumber: number,
    correlation?: CorrelationConstant
  ): LongCount {
    if (mayanDayNumber < 0) {
      throw new Error(`Maya Day Number must be non-negative. Got ${mayanDayNumber}`);
    }

    // Decompose using mixed-radix system
    // k'in: base 20 (0-19)
    const kin = mayanDayNumber % 20;
    
    // winal: base 18 (0-17), since 18 winal = 1 tun
    const winal = Math.floor(mayanDayNumber / 20) % 18;
    
    // tun: base 20 (0-19)
    const tun = Math.floor(mayanDayNumber / 360) % 20;
    
    // k'atun: base 20 (0-19)
    const katun = Math.floor(mayanDayNumber / 7200) % 20;
    
    // bak'tun: unbounded (but we'll handle higher orders too)
    const baktun = Math.floor(mayanDayNumber / 144000) % 20;
    
    // Higher-order units (piktun, kalabtun, kinchiltun)
    const piktun = Math.floor(mayanDayNumber / 2880000) % 20;
    const kalabtun = Math.floor(mayanDayNumber / 57600000) % 20;
    const kinchiltun = Math.floor(mayanDayNumber / 1152000000);

    // Build the Long Count with all components
    // The constructor handles trailing zeros appropriately
    const parts: number[] = [kin, winal, tun, katun, baktun];
    
    // Only add higher-order units if they're needed
    if (kinchiltun > 0) {
      parts.push(piktun, kalabtun, kinchiltun);
    } else if (kalabtun > 0) {
      parts.push(piktun, kalabtun);
    } else if (piktun > 0) {
      parts.push(piktun);
    }

    const lc = new LongCount(...parts);
    if (correlation) {
      lc.setCorrelationConstant(correlation);
    }
    return lc;
  }

  private correlationConstant: CorrelationConstant;

  /**
   * @param {...number|Wildcard} cycles - Components in the long count
   * (eg, K'in, Winal, Bak'tun, etc)
   */
  constructor(...cycles: (number | Wildcard)[]) {
    super(...cycles);
    /**
     * Correlation constant to allow alignment with western calendars.
     * 
     * Defaults to 584283 (original GMT correlation). The GMT correlation is
     * actually a family of closely-related values (584283, 584285, 584286) that
     * differ by only a few days. 584283 is used here as the traditional "GMT"
     * value, though 584285 (Modified GMT) and 584286 (Martin-Skidmore) are also
     * widely used in modern scholarship.
     * 
     * Use setCorrelationConstant() to change this value.
     * 
     * @type {CorrelationConstant}
     * @see CorrelationConstant
     * @see Martin, S., & Skidmore, J. (2012). "Exploring the 584286 Correlation"
     */
    this.correlationConstant = getCorrelationConstant(584283);
  }

  /**
   * Chainable method to set the correlation constant
   * @param {CorrelationConstant} newConstant
   * @return {LongCount}
   */
  setCorrelationConstant(newConstant: CorrelationConstant) {
    this.correlationConstant = newConstant;
    return this;
  }

  /**
   * Return a representation of this Long Count in Julian Days.
   * @return {number}
   */
  get julianDay() {
    return this.correlationConstant.value + this.getPosition();
  }

  /**
   * Return a Gregorian representation of this long count date, offset by the correlation constant.
   * @return {GregorianCalendarDate}
   */
  get gregorian() {
    return new GregorianCalendarDate(this.julianDay);
  }

  /**
   * Return a Julian representation of this long count date, offset by the correlation constant.
   * @return {JulianCalendarDate}
   */
  get julian() {
    return new JulianCalendarDate(this.julianDay);
  }

  /**
   * Create a copy object of this long count fullDate
   * @returns {LongCount}
   */
  clone() {
    return new LongCount(...this.parts);
  }

  /**
   *
   * @return {LordOfTheNight}
   */
  get lordOfNight(): LordOfTheNight {
    return lords.get(
      `G${((this.getPosition() - 1) % 9) + 1}`
    );
  }

  /**
   *
   * @return {CalendarRound}
   */
  buildCalendarRound() {
    return origin.shift(
      this.getPosition()
    );
  }

  /**
   *
   * @return {FullDate}
   */
  buildFullDate() {
    return new FullDate(
      this.buildCalendarRound(),
      this.clone()
    );
  }

  /**
   * Return the sum of this Long Count and the supplied
   * @param {LongCount} newLc
   * @return {LongcountAddition}
   */
  plus(newLc: LongCount) {
    /*  We pass the LongCount class in, as to require this in the operation
     *  will create a circular dependency.
     */
    return new LongcountAddition(LongCount, this, newLc);
  }

  /**
   * Return the difference between this Long Count and the supplied
   * @param {LongCount} newLc
   * @return {LongcountAddition}
   */
  minus(newLc: LongCount) {
    /*  We pass the LongCount class in, as to require this in the operation
     *  will create a circular dependency.
     */
    return new LongcountSubtraction(LongCount, this, newLc);
  }

  /**
   * Return this Long Count as a Distance Number
   * @return {DistanceNumber}
   */
  asDistanceNumber() {
    return new DistanceNumber(...this.parts);
  }

  /**
   * Compare two Long Count dates for equality.
   * Unlike DistanceNumber.equal(), this compares all parts, handling trailing zeros correctly.
   * This ensures dates with k'in=0 are compared correctly (e.g., 0.0.0.0.0 vs 0.2.12.13.0).
   * @param {IPart} other
   * @return {boolean}
   */
  equal(other: IPart): boolean {
    if (other instanceof LongCount) {
      // Normalize both by removing trailing zeros, then compare
      const thisParts = this.normalizedParts();
      const otherParts = other.normalizedParts();
      
      if (thisParts.length !== otherParts.length) {
        return false;
      }
      
      if (this.sign !== other.sign) {
        return false;
      }
      
      return thisParts.every((part, i) => {
        const otherPart = otherParts[i];
        return isWildcard(part) ? isWildcard(otherPart) : part === otherPart;
      });
    }
    return false;
  }

  /**
   * Get normalized parts by removing trailing zeros.
   * @return {(number | Wildcard)[]}
   */
  private normalizedParts(): (number | Wildcard)[] {
    const parts = [...this.parts];
    // Remove trailing zeros (but keep at least one part)
    while (parts.length > 1 && parts[parts.length - 1] === 0) {
      parts.pop();
    }
    return parts;
  }
}
