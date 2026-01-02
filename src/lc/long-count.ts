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
