/** @ignore */
const Factory = require('./base');
/** @ignore */
const CalendarRoundFactory = require('./calendar-round');
/** @ignore */
const LongCountFactory = require('./long-count');
/** @ignore */
const FullDate = require('../full-date');

/**
 * Given a date composed of a Long Count and a Calendar Round, create a
 * {FullDate} object.
 * @extends {Factory}
 */
class FullDateFactory extends Factory {
  /**
   *
   * @param {String} raw
   * @return {FullDate}
   */
  parse(raw) {
    raw = raw.replace('**', '* *');
    let cr = new CalendarRoundFactory().parse(raw);
    let lc = new LongCountFactory().parse(raw);
    return new FullDate(
      cr,
      lc,
    );
  }
}

module.exports = FullDateFactory;
