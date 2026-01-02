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

  /**
   * Get the calendar date representation.
   * @returns Calendar object with year, month, and day properties from moonbeams library
   */
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
   * Represent this date as a string with era markers.
   * @return {string}
   */
  toString() {
    return `${this.day}/${this.month}/${this.year} ${this.era}`;
  }

  /**
   * Represent this date in ISO 8601 format (YYYY-MM-DD) using astronomical year numbering.
   * For BCE dates, uses astronomical year numbering where 1 BCE = year 0, 2 BCE = year -1, etc.
   * @return {string}
   */
  toISOString() {
    // Use this.date.year directly as it's already in astronomical year numbering
    // (negative for BCE dates: -1 = 2 BCE, 0 = 1 BCE, positive for CE dates)
    const isoYear = this.date.year;
    
    // Format with zero-padding: YYYY-MM-DD
    // Handle negative years separately to avoid padding issues with the minus sign
    const yearStr = isoYear < 0 
      ? '-' + Math.abs(isoYear).toString().padStart(4, '0')
      : isoYear.toString().padStart(4, '0');
    const monthStr = this.month.toString().padStart(2, '0');
    const dayStr = this.day.toString().padStart(2, '0');
    
    return `${yearStr}-${monthStr}-${dayStr}`;
  }
}
