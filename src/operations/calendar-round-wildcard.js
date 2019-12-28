const CalendarRound = require('../cr/calendar-round')
const wildcard = require('../wildcard')

class CalendarRoundWildcard {
  /**
   * @param {CalendarRound} cr
   */
  constructor (cr) {
    this.cr = cr
    this.start_date = new CalendarRound(
      8, 'Ajaw',
      4, 'Kumk\'u',
    )
  }

  run () {
    let potentials = []
    // Iterate through dates and compare
    let iter = new CalendarRoundIterator()
    let cr = iter.next()
    while (!cr.done) {
      // if (this.cr.match(cr.value)) {
      if (this._date_matches_wildcards(this.cr, cr.value)) {
        potentials.push(cr.value)
      }
      cr = iter.next()
    }
    return potentials
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
    
    let is_match = true
    if (partial.tzolkin.coeff !== wildcard) {
      is_match &= (partial.tzolkin.coeff === full.tzolkin.coeff)
    }
    if (partial.tzolkin.day !== wildcard) {
      is_match &= (partial.tzolkin.name === full.tzolkin.name)
    }
    if (partial.haab.coeff !== wildcard) {
      is_match &= (partial.haab.coeff === full.haab.coeff)
    }
    if (partial.haab.month !== wildcard) {
      is_match &= (partial.haab.name === full.haab.name)
    }

    if (!is_match) {
      is_match = (partial.haab.coeff === wildcard) &&
        (partial.haab.name === wildcard) &&
        (partial.tzolkin.coeff === wildcard) &&
        (partial.tzolkin.name === wildcard)
    }
    return Boolean(is_match)

  }
}

class CalendarRoundIterator {
  /**
   *
   * @param {CalendarRound} date
   */
  constructor (date) {
    if (date === undefined) {
      date = new CalendarRound(
        8, 'Ajaw',
        4, 'Kumk\'u',
      )
    }
    this.date = date
    this.current = this.date
    this.is_first = true
  }

  next () {
    if (this.is_first) {
      this.is_first = false
      return {value: this.current, done: false}
    }
    let next = this.current.next()
    if (next.equal(this.date)) {
      return {value: null, done: true}
    } else {
      this.current = next
      return {value: next, done: false}
    }
  }

}

module.exports = CalendarRoundWildcard
