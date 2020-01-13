/** @ignore */
const {origin} = require('../cr/index');

/**
 * Used to iterate through the entire cycle of 18,980 days for the full
 * permutation of Haab and 260-day count.
 * @ignore
 */
class CalendarRoundIterator {
  /**
   *
   * @param {CalendarRound} fullDate
   */
  constructor(newDate) {
    /**
     * @type {CalendarRound}
     */
    this.current = undefined;

    /**
     * @type boolean
     */
    this.is_first = undefined;

    let fullDate = newDate;
    if (fullDate === undefined) {
      fullDate = origin;
    }
    /**
     * @type {CalendarRound}
     */
    this.fullDate = fullDate;
    this.reset();
  }

  /**
   * Reset this iterator so that it can be reused.
   */
  reset() {
    this.current = this.fullDate;
    this.is_first = true;
  }

  /**
   * Move to the next position in the iterator or end the iteration.
   * @return {{value: null, done: boolean}|{value: CalendarRound, done: boolean}}
   */
  next() {
    if (this.is_first) {
      this.is_first = false;
      return {value: this.current, done: false};
    }
    const next = this.current.next();
    if (next.equal(this.fullDate)) {
      return {value: null, done: true};
    }
    this.current = next;
    return {value: next, done: false};
  }
}

module.exports = CalendarRoundIterator
