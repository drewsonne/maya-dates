const Factory = require('./base')
const CalendarRoundFactory = require('./calendar-round')
const LongCountFactory = require('./long-count')

class FullDateFactory extends Factory {
  parse (raw) {
    raw = raw.replace('**', '* *')
    let cr = new CalendarRoundFactory().parse(raw)
    let lc = new LongCountFactory().parse(raw)
    return {
      cr: cr,
      lc: lc,
    }
  }
}

module.exports = FullDateFactory
