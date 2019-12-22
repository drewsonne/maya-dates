/** @ignore */
const tzolkin = require('./tzolkin')
/** @ignore */
const haab = require('./haab')

/**
 * A combination of 260-day cycles and the Haab cycle.
 * @example
 *  let cr = new CalendarRound(8, "Ajaw", 4, "Kumk'u");
 */
class CalendarRound {
  /**
   *
   * @param {number} tzolkin_coeff Coefficient for the 260-day cycle
   * @param {string} tzolkin_day Name of the name in the 260-day cycle
   * @param {number} haab_coeff Day in the Haab month
   * @param {string} haab_month Name of the Haab month
   */
  constructor (tzolkin_coeff, tzolkin_day, haab_coeff, haab_month) {
    /**
     * 260-day cycle component of the Calendar Round
     * @type {Tzolkin}
     */
    this.tzolkin = new tzolkin.Tzolkin(tzolkin_coeff, tzolkin_day)
    /**
     * Haab cycle component of the Calendar Round
     * @type {Haab}
     */
    this.haab = new haab.Haab(haab_coeff, haab_month)
  }

  /**
   * Increment both the Haab and 260-day cycle to the next day in the Calendar Round
   * @returns {CalendarRound}
   */
  next () {
    let new_cr = new CalendarRound()
    new_cr.haab = this.haab.next()
    new_cr.tzolkin = this.tzolkin.next()
    return new_cr
  }

  /**
   * Render the CalendarRound cycle date as a string
   * @returns {string}
   */
  toString () {
    return `${this.tzolkin} ${this.haab}`
  }
}

module.exports = {
  'CalendarRound': CalendarRound,
  'tzolkin': tzolkin,
  'haab': haab,
}
