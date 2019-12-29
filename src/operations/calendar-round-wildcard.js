const CalendarRound = require('../cr/calendar-round')
const wildcard = require('../wildcard')

class CalendarRoundWildcard {
  /**
   * @param {CalendarRound} cr
   */
  constructor (cr) {
    this.cr = cr
    this.start_date = new CalendarRound(
      4, 'Ajaw',
      8, 'Kumk\'u',
    )
  }

  run () {
    let potentials = []
    // Iterate through dates and compare
    let iter = new CalendarRoundIterator()
    let cr = iter.next()
    while (!cr.done) {
      if (this.cr.match(cr.value)) {
        potentials.push(cr.value)
      }
      cr = iter.next()
    }
    return potentials
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
        4, 'Ajaw',
        8, 'Kumk\'u',
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
    this.count += 1
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
