/**
 * Used to iterate through the entire cycle of 18,980 days for the full
 * permutation of Haab and 260-day count.
 * @ignore
 */
import {CalendarRound, origin} from "../cr/calendar-round";

export default class CalendarRoundIterator {
  fullDate: CalendarRound;
  current: CalendarRound;
  isFirst: boolean;

  constructor() {
    /**
     * @type {CalendarRound}
     */
    this.current = undefined;

    /**
     * @type boolean
     */
    this.isFirst = undefined;

    /**
     * @type {CalendarRound}
     */
    this.fullDate = origin;
    this.reset();
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
  next() {
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
