const wildcard = require('../wildcard')
const mayadates = require('../index')

let _all_calendar_rounds

class CalendarRoundWildcard {
  /**
   * @param {CalendarRound} cr
   */
  constructor (cr) {
    this.cr = cr
    this.start_date = new mayadates.cr.CalendarRound(
      8, 'Ajaw',
      4, 'Kumk\'u',
    )
  }

  run () {
    let potentials = []
    // 1 - Do wildcards for Tzolkin coeff
    if (this.cr.tzolkin.coeff === wildcard) {
      let new_potentials = []
      for (let i = 1; i < 13; i++) {
        let new_cr = this.cr.clone()
        new_cr.tz
      }
      potentials = new_potentials
    }
    // 2 - Do wildcards for Tzolkin day
    // 3 - Do wildcards for Haab coeff
    // 4 - Do wildcards for Haab month
  }

  /**
   *
   * @param {CalendarRound} partial
   * @param {CalendarRound} full
   */
  _date_matches_wildcards (
    partial,
    full,
  ) {
    let is_match = false
    if (partial.tzolkin.coeff !== wildcard) {
      is_match |= (partial.tzolkin.coeff === full.tzolkin.coeff)
    }
    if (partial.tzolkin.day !== wildcard) {
      is_match |= (partial.tzolkin.day === full.tzolkin.day)
    }
    if (partial.haab.coeff !== wildcard) {
      is_match |= (partial.haab.coeff === full.haab.coeff)
    }
    if (partial.haab.month !== wildcard) {
      is_match |= (partial.haab.month === full.haab.month)
    }
    return is_match

  }
}

module.exports = CalendarRoundWildcard
