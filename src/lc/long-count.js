/** @ignore */
const moonbeams = require('moonbeams');
/** @ignore */
const wildcard = require('../wildcard');
/** @ignore */
const {origin} = require('../cr/calendar-round');
/** @ignore */
const FullDate = require('../full-date');
/** @ignore */
const night = require('./night/lord-of-night');
/** @ignore */
const LongcountAddition = require('../operations/longcount-addition');
/** @ignore */
const LongcountSubtraction = require('../operations/longcount-subtraction');
/** @ignore */
const getCorrelationConstant = require('./correlation-constant');
/** @ignore */
const GregorianCalendarDate = require('./western/gregorian');
/** @ignore */
const JulianCalendarDate = require('./western/julian');
/** @ignore */
const DistanceNumber = require('./distance-number');

/**
 * Long Count cycle
 */
class LongCount extends DistanceNumber {
  /**
   * @param {...number|Wildcard} cycles - Components in the long count
   * (eg, K'in, Winal, Bak'tun, etc)
   */
  constructor(...cycles) {
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
  setCorrelationConstant(newConstant) {
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
   * @return {LordOfNight}
   */
  get lordOfNight() {
    return night.get(
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
  plus(newLc) {
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
  minus(newLc) {
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

module.exports = LongCount;
