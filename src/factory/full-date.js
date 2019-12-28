const Factory = require('./base')
const CalendarRoundFactory = require('./calendar-round')
const LongCountFactory = require('./long-count')
const FullDate = require('../full-date')

class FullDateFactory extends Factory {
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
