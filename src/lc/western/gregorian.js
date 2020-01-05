const moonbeams = require('moonbeams');
const moment = require('moment-timezone');
const WesternCalendar = require('./western');

const JDAY_FOR_JULIAN_SWITCH = 2299160;
const DATE_FOR_JULIAN_SWITCH = moment.tz('1582-10-14', 'UTC');

class GregorianCalendarDate extends WesternCalendar {
  constructor(julianDay) {
    super(julianDay, GregorianCalendarDate);
    this.date = DATE_FOR_JULIAN_SWITCH.add(
      this.julianDay - JDAY_FOR_JULIAN_SWITCH, 'days'
    );
  }

  get year() {
    if (this.era === 'BCE') {
      return Math.abs(this.date.year() + 1);
    }
    return this.date.year();
  }

  get month() {
    return this.date.month() + 1;
  }

  get day() {
    return Math.floor(this.date.day());
  }

  get era() {
    return (this.date.year() < 0) ? 'BCE' : 'CE';
  }
}

module.exports = GregorianCalendarDate;
