/**
 * Represents either a Julian or Gregorian calendar.
 * @abstract
 */
/// <reference path="../../../decs.d.ts" />
import * as moonbeams from "moonbeams";

export default abstract class WesternCalendar {
  public julianDay: number;
  private _date: moonbeams.MBCalendar | null;

  abstract get offset(): number;

  /**
   * Store a date with reference to a Julian Day.
   * @param {number} julianDay
   */
  constructor(julianDay: number) {
    /**
     * @type {number}
     */
    this.julianDay = julianDay;

    /**
     * @type {Date}
     */
    this._date = null
  }

  get date(): moonbeams.MBCalendar {
    if (this._date === null) {
      this._date = moonbeams.jdToCalendar(this.julianDay + this.offset);
    }
    return this._date
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
