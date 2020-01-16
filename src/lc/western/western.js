const moonbeams = require('moonbeams');

class WesternCalendar {
//   constructor(julianDay, new_class) {
//     this.julianDay = julianDay;
//     this.offset = 0;
//     this.class = new_class;
//   }
//
//
//   clone(offset) {
//     if (offset === undefined) {
//       offset = 0;
//     }
//     return new this.class(this.julianDay + offset);
//   }

  constructor(julianDay) {
    this.julianDay = julianDay;
    this.date = moonbeams.jdToCalendar(julianDay + this.offset);
  }

  get year() {
    if (this.era === 'BCE') {
      return Math.abs(this.date.year - 1);
    }
    return this.date.year;
  }

  get month() {
    return this.date.month;
  }

  get day() {
    return Math.floor(this.date.day);
  }

  get era() {
    return (this.date.year < 0) ? 'BCE' : 'CE';
  }

  toString() {
    const date = `${this.day}/${this.month}/${this.year} ${this.era}`;
    if (['15/10/1582 CE', '4/10/1582 CE'].includes(date)) {
      return `${date}*`;
    }
    return date;
  }
}


module.exports = WesternCalendar;
