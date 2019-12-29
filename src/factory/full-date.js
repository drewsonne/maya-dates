const Factory = require('./base')
const CalendarRoundFactory = require('./calendar-round')
const LongCountFactory = require('./long-count')
const FullDate = require('../full-date')

/**
 * Given a date composed of a Long Count and a Calendar Round, create a
 * {FullDate} object.
 */
class FullDateFactory extends Factory {
  /**
   * 
   * @param {String} raw
   * @return {FullDate}
   */
  parse (raw) {
    raw = raw.replace('**', '* *')
    let cr = new CalendarRoundFactory().parse(raw)
    let lc = new LongCountFactory().parse(raw)
    return new FullDate(
      cr,
      lc,
    )
  }
}

module.exports = FullDateFactory
