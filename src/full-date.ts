/**
 * An encapsulation of a LongCount and Calendar Round which match each other.
 */
import LongCount from "./lc/long-count";
import {CalendarRound} from "./cr/calendar-round";

export default class FullDate {

  cr: CalendarRound;
  lc: LongCount;

  constructor(cr: CalendarRound, lc: LongCount) {
    this.cr = cr;
    this.lc = lc;
  }

  /**
   * Render the FullDate as a string of both the CR and the LC
   */
  toString(): string {
    return `${this.cr} ${this.lc}`;
  }
}
