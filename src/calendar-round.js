const tzolkin = require('./tzolkin')
const haab = require('./haab')

class CalendarRound {
  constructor (day_coeff, day, month_coeff, month) {
    this.haab = new haab.Haab(day_coeff, day)
    this.tzolkin = new tzolkin.Tzolkin(month_coeff, month)
  }
}

module.exports = {
  'CalendarRound': CalendarRound,
  'tzolkin': tzolkin,
  'haab': haab,
}
