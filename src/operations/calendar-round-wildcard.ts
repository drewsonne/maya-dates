import CalendarRoundIterator from './calendar-round-iter';

/**
 * A reusable singleton instance of the CalendarRoundIterator
 * @ignore
 * @type {CalendarRoundIterator}
 */
const iter = new CalendarRoundIterator();

/**
 * Given a Calendar Round with a wildcard, calculate all possible matching
 * fully qualified Calendar Rounds.
 */
export default class CalendarRoundWildcard {
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
    const potentials = [];
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
