/** @ignore */
const WesternCalendar = require('./western');

/**
 * Represent a Julian date.
 * @extends {WesternCalendar}
 */
class JulianCalendarDate extends WesternCalendar {

  /**
   * Handle the sliding offset between gregorian and julian dates
   * @return {number}
   */
  get offset() {
    if (this.julianDay === 2299160) {
      return 0;
    }
    if (this.julianDay > 2463863) {
      return -13;
    }
    if (this.julianDay > 2415078) {
      return -12;
    }
    if (this.julianDay > 2378554) {
      return -11;
    }
    if (this.julianDay > 2312663) {
      return -10;
    }
    if (this.julianDay > 2240663) {
      return 0;
    }
    if (this.julianDay > 2232466) {
      return -1;
    }
    if (this.julianDay > 2175863) {
      return 0;
    }
    if (this.julianDay > 2096663) {
      return 1;
    }
    return 0;
  }
}

module.exports = JulianCalendarDate;
