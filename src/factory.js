const cr = require('./calendar-round')

class Factory {
  split (raw_calendar_round) {
    let matches = raw_calendar_round.match(
      this.pattern,
    )
    if (matches === null) {
      return []
    }
    return matches.slice(1)
  }

  is_partial (raw) {
    let parts = this.split(raw)
    return parts.includes('*')
  }
}

class CalendarRoundFactory extends Factory {
  constructor () {
    super()
    this.pattern = /^([*\d]+)\s?([^\s]+)\s?([*\d]+)\s?([^\s]+)$/
  }

  parse (raw_calendar_round) {
    let parts = this.split(raw_calendar_round)
    return new cr.CalendarRound(
      parseInt(parts[0]), parts[1],
      parseInt(parts[2]), parts[3],
    )
  }
}

module.exports = {
  'CalendarRoundFactory': CalendarRoundFactory,
}
