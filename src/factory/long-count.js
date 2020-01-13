/** @ignore */
const Factory = require('./base');
/** @ignore */
const LongCount = require('../lc/long-count');
/** @ignore */
const wildcard = require('../wildcard');

/**
 * A factory to create a LongCount object from a string
 * @extends {Factory}
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
  // eslint-disable-next-line class-methods-use-this
  parse(raw) {
    const dates = raw.match(/(?:(?:\*|(?:[\d]{1,2}))\.){1,}(?:(?:\*)|(?:[\d]{1,2}))/);
    if (dates.length !== 1) {
      return null;
    }

    const parts = dates[0].split('.');

    return new LongCount(
      ...new Array(Math.max(5 - parts.length, 0))
        .fill('0')
        .concat(parts)
        .map(
          (part) => ((part === '*') ? wildcard : parseInt(part, 10)),
        )
        .reverse(),
    );
  }
}

module.exports = LongCountFactory;
