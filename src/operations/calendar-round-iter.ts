/**
 * Used to iterate through the entire cycle of 18,980 days for the full
 * permutation of Haab and 260-day count.
 * @ignore
 */
import {CalendarRound, origin} from "../cr/calendar-round";

interface NextResult {
  value: null | CalendarRound
  done: boolean
}

export default class CalendarRoundIterator {
  fullDate: CalendarRound;
  current: CalendarRound;
  isFirst: boolean;

  constructor() {

    /**
     * @type boolean
     */
    this.isFirst = true;

    /**
     * @type {CalendarRound}
     */
    this.fullDate = origin;

    /**
     * @type {CalendarRound}
     */
    this.current = this.fullDate;
  }

  /**
   * Reset this iterator so that it can be reused.
   */
  reset() {
    this.current = this.fullDate;
    this.isFirst = true;
  }

  /**
   * Move to the next position in the iterator or end the iteration.
   * @return {{value: null, done: boolean}|{value: CalendarRound, done: boolean}}
   */
  next(): NextResult {
    if (this.isFirst) {
      this.isFirst = false;
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
