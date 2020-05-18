import moonbeams from 'moonbeams';

/**
 * Represents either a Julian or Gregorian calendar.
 * @abstract
 */
export default class WesternCalendar {
  /**
   * Store a date with reference to a Julian Day.
   * @param {number} julianDay
   */
  constructor(julianDay) {
    /**
     * @type {number}
     */
    this.julianDay = julianDay;

    /**
     * @type {Date}
     */
    this.date = moonbeams.jdToCalendar(julianDay + this.offset);
  }

  /**
   * Return the year
   * @return {number}
   */
  get year() {
    if (this.era === 'BCE') {
      return Math.abs(this.date.year - 1);
    }
    return this.date.year;
  }

  /**
   * Return the month
   * @return {number}
   */
  get month() {
    return this.date.month;
  }

  /**
   * Return the day of the month
   * @return {number}
   */
  get day() {
    return Math.floor(this.date.day);
  }

  /**
   * Return whether the date is the common era or before the common era.
   * @return {string}
   */
  get era() {
    return (this.date.year < 0) ? 'BCE' : 'CE';
  }

  /**
   * Return true if this date is on the Julian/Gregorian threshold
   * @return {boolean}
   */
  isThreshold() {
    return this.year === 1582 && this.month === 10 && [15, 4].includes(this.day);
  }

  /**
   * Represent this date as a string with era markers. If the date is suffixed with
   * a '*', this date is on the Julian/Gregorian threshold date.
   * @return {string}
   */
  toString() {
    const date = `${this.day}/${this.month}/${this.year} ${this.era}`;
    if (this.isThreshold()) {
      return `${date}*`;
    }
    return date;
  }
}
