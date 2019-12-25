const Factory = require('./base')
const LongCount = require('../lc/long-count')
const wildcard = require('../wildcard')

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

module.exports = LongCountFactory
