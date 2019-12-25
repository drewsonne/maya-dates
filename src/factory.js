/** @ignore */
const CalendarRound = require('./calendar-round').CalendarRound
/** @ignore */
const LongCount = require('./long-count').LongCount
/** @ignore */
const wildcard = require('./wildcard')

/**
 * An abstract class to handle the create of an object from a string
 */
class Factory {
  /**
   * Define properties to be override by sub-classes
   */
  constructor () {
    /**
     * Describes how to break a string into a date element
     * @protected
     * @type {RegExp}
     */
    this.pattern = null
  }

  /**
   * Split the provided date into its components
   * @param {string} raw
   * @access protected
   * @returns {String[]}
   */
  _split (raw) {
    let matches = raw.match(
      this.pattern,
    )
    if (matches === null) {
      return []
    }
    return matches.slice(1)
  }

  /**
   * Checks if the string contains a partial date
   * @param {string} raw - Raw date string
   * @access protected
   * @returns {boolean}
   */
  // _is_partial (raw) {
  //   let parts = this._split(raw)
  //   return parts.includes('*')
  // }
}

/**
 * A factory to create a CalendarRound object from a string
 * @extends Factory
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
    this.pattern = /^([*\d]+)\s?([^\s]+)\s?([*\d]+)\s?([^\s]+)$/
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

/**
 * A factory to create a LongCount object from a string
 * @extends Factory
 * @example
 *    let cr = new LongCountFactory().parse("9.4.2.4.1");
 * @example
 *    let cr = new LongCountFactory().parse("9.4.2.*.1");
 */
class LongCountFactory extends Factory {
  /**
   * Given a string, parse it and create a Long Count
   * @param {string} raw - A string containing a Long Count
   * @returns {LongCount}
   */
  parse (raw) {
    let parts = raw.split('.')
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === '*') {
        parts[i] = wildcard
      } else {
        parts[i] = parseInt(parts[i])
      }
    }
    return new LongCount(...parts.reverse())
  }
}

module.exports = {
  'CalendarRoundFactory': CalendarRoundFactory,
  'LongCountFactory': LongCountFactory,
}
