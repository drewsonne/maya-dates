const moonbeams = require('moonbeams');
const moment = require('moment-timezone');
const WesternCalendar = require('./western');

// const JDAY_FOR_JULIAN_SWITCH = 2299160;
// const DATE_FOR_JULIAN_SWITCH = moment.tz('1582-10-14', 'UTC');
//
// class GregorianCalendarDate extends WesternCalendar {
//   constructor(julianDay) {
//     super(julianDay, GregorianCalendarDate);
//     this.date = DATE_FOR_JULIAN_SWITCH.add(
//       this.julianDay - JDAY_FOR_JULIAN_SWITCH, 'days'
//     );
//   }
//
//   get year() {
//     if (this.era === 'BCE') {
//       return Math.abs(this.date.year() + 1);
//     }
//     return this.date.year();
//   }
//
//   get month() {
//     return this.date.month() + 1;
//   }
//
//   get day() {
//     return Math.floor(this.date.day());
//   }
//
//   get era() {
//     return (this.date.year() < 0) ? 'BCE' : 'CE';
//   }
// }

class GregorianCalendarDate extends WesternCalendar {

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
