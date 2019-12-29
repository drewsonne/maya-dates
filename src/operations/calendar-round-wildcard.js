const CalendarRound = require('../cr/calendar-round')
const origin = require('../cr/index').origin

class CalendarRoundIterator {
  /**
   *
   * @param {CalendarRound} date
   */
  constructor (date) {
    if (date === undefined) {
      date = origin
    }
    this.date = date
    this.reset()
  }

  reset () {
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

const iter = new CalendarRoundIterator()

class CalendarRoundWildcard {
  /**
   * @param {CalendarRound} cr
   */
  constructor (cr) {
    this.cr = cr
  }

  run () {
    let potentials = []
    // Iterate through dates and compare
    let cr = iter.next()
    while (!cr.done) {
      if (this.cr.match(cr.value)) {
        potentials.push(cr.value)
      }
      cr = iter.next()
    }
    iter.reset()
    return potentials
  }

}

module.exports = CalendarRoundWildcard
