/**
 * An encapsulation of a LongCount and Calendar Round which match each other.
 */
import LongCount from "./lc/long-count";
import {CalendarRound} from "./cr/calendar-round";
import {IPart} from "./i-part";
import {CommentWrapper} from "./comment-wrapper";

export default class FullDate extends CommentWrapper implements IPart {

  cr: CalendarRound;
  lc: LongCount;

  constructor(cr: CalendarRound, lc: LongCount) {
    super();
    this.cr = cr;
    this.lc = lc;
  }


  /**
   * Render the FullDate as a string of both the CR and the LC
   */
  toString(): string {
    return `${this.cr} ${this.lc}`;
  }

  isPartial(): boolean {
    return this.cr.isPartial() || this.lc.isPartial()
  }

  equal(other: IPart): boolean {
    if (other instanceof FullDate) {
      throw new Error('Not Implemented')
    }
    return false;
  }
}
