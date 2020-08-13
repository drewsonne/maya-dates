import FullDate from '../full-date';
import JulianCalendarDate from './western/julian';
import DistanceNumber from './distance-number';
import {LordOfTheNight, lords} from "./night/lord-of-night";
import {Wildcard} from "../wildcard";
import {CorrelationConstant, getCorrelationConstant} from "./correlation-constant";
import {origin} from "../cr/calendar-round";
import LongcountAddition from "../operations/longcount-addition";
import LongcountSubtraction from "../operations/longcount-subtraction";
import GregorianCalendarDate from "./western/gregorian";
import IPart from "../i-part";

/**
 * Long Count cycle
 */
export default class LongCount extends DistanceNumber {
  private correlationConstant: CorrelationConstant;

  /**
   * @param {...number|Wildcard} cycles - Components in the long count
   * (eg, K'in, Winal, Bak'tun, etc)
   */
  constructor(...cycles: (number | Wildcard)[]) {
    super(...cycles);
    /**
     * Correlation constant to allow alignment with western calendars
     * @type {CorrelationConstant}
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
}
