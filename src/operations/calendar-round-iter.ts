/**
 * Iterator over the full 18,980 day Calendar Round cycle.
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

  /** Reset the iterator to the start of the cycle. */
  reset() {
    this.current = this.fullDate;
    this.isFirst = true;
  }

  /**
   * Move to the next position in the cycle.
   */
  next(): NextResult {
    if (this.isFirst) {
      this.isFirst = false;
      return {value: this.current, done: false};
    }
    const next = this.current.next();
    if (next === this.fullDate) {
      return {value: null, done: true};
    }
    this.current = next;
    return {value: next, done: false};
  }
}
