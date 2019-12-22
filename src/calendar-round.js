const tzolkin = require('./tzolkin')
const haab = require('./haab')

class CalendarRound {
  constructor (tzolkin_coeff, tzolkin_day, haab_coeff, haab_month) {
    this.tzolkin = new tzolkin.Tzolkin(tzolkin_coeff, tzolkin_day)
    this.haab = new haab.Haab(haab_coeff, haab_month)
  }

  next () {
    let new_cr = new CalendarRound()
    new_cr.haab = this.haab.next()
    new_cr.tzolkin = this.tzolkin.next()
    return new_cr
  }
}

module.exports = {
  'CalendarRound': CalendarRound,
  'tzolkin': tzolkin,
  'haab': haab,
}
