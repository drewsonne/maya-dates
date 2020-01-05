/** @ignore */
const CalendarRound = require('../cr/calendar-round');
/** @ignore */
const origin = require('../cr/index').origin;

/**
 * Used to iterate through the entire cycle of 18,980 days for the full
 * permutation of Haab and 260-day count.
 * @ignore
 */
class _CalendarRoundIterator {
  /**
   *
   * @param {CalendarRound} date
   */
  constructor(date) {
    /**
     * @type {CalendarRound}
     */
    this.current = undefined;

    /**
     * @type boolean
     */
    this.is_first = undefined;

    if (date === undefined) {
      date = origin;
    }
    /**
     * @type {CalendarRound}
     */
    this.date = date;
    this.reset();
  }

  /**
   * Reset this iterator so that it can be reused.
   */
  reset() {
    this.current = this.date;
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
    let next = this.current.next();
    if (next.equal(this.date)) {
      return {value: null, done: true};
    } else {
      this.current = next;
      return {value: next, done: false};
    }
  }

}

/**
 * A reusable singleton instance of the CalendarRoundIterator
 * @ignore
 * @type {_CalendarRoundIterator}
 */
const iter = new _CalendarRoundIterator();

/**
 * Given a Calendar Round with a wildcard, calculate all possible matching
 * fully qualified Calendar Rounds.
 */
class CalendarRoundWildcard {
  /**
   * @param {CalendarRound} cr
   */
  constructor(cr) {
    /**
     * @type {CalendarRound}
     */
    this.cr = cr;
  }

  /**
   * Run calculation to find all fully qualified Calendar Rounds
   * @return {CalendarRound[]}
   */
  run() {
    let potentials = [];
    // Iterate through dates and compare
    let cr = iter.next();
    while (!cr.done) {
      if (this.cr.match(cr.value)) {
        potentials.push(cr.value);
      }
      cr = iter.next();
    }
    iter.reset();
    return potentials;
  }

}

module.exports = CalendarRoundWildcard;
