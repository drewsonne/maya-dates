const Factory = require('./base')
const CalendarRound = require('../cr/calendar-round')

/**
 * A factory to create a CalendarRound object from a string
 * @extends {Factory}
 * @example
 *    let cr = new CalendarRoundFactory().parse("4 Ajaw 8 Kumk'u");
 */
class CalendarRoundFactory extends Factory {
  /**
   * Defines the pattern describing a Calendar Round
   */
  constructor () {
    super()
    /**
     * Describes how to break the string into a Calendar Round
     * @type {RegExp}
     */
    this.pattern = /([*\d]+)\s?([^\s]+)\s?([*\d]+)\s?([^\s]+)/
  }

  /**
   * Given a string, parse it and create a Calendar Round
   * @param {string} raw - A string containing a Calendar Round
   * @returns {CalendarRound}
   */
  parse (raw) {
    let parts = this._split(raw)
    if (parts.length < 4) {
      return null
    } else {
      return new CalendarRound(
        parts[0], parts[1],
        parts[2], parts[3],
      )
    }
  }
}

module.exports = CalendarRoundFactory
