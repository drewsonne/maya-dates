/** @ignore */
const WesternCalendar = require('./western');

/**
 * Represent a Gregorian date.
 * @extends {WesternCalendar}
 */
class GregorianCalendarDate extends WesternCalendar {

  /**
   * Handle the sliding offset between gregorian and julian dates
   * @return {number}
   */
  get offset() {
    if (this.julianDay === 2299160) {
      return 0;
    }
    if (this.julianDay <= 1448283) {
      return -8;
    }
    if (this.julianDay <= 1455864) {
      return -8;
    }
    if (this.julianDay <= 1599864) {
      return -5;
    }
    if (this.julianDay <= 1743864) {
      return -2;
    }
    if (this.julianDay <= 1887864) {
      return 1;
    }
    if (this.julianDay <= 2031864) {
      return 4;
    }
    if (this.julianDay <= 2096664) {
      return 6;
    }
    if (this.julianDay <= 2175864) {
      return 7;
    }
    if (this.julianDay <= 2240664) {
      return 9;
    }
    if (this.julianDay <= 2299160) {
      return 10;
    }
    return 0;
  }
}

module.exports = GregorianCalendarDate;
