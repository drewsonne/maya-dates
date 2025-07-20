/**
 * Combination of a {@link CalendarRound} and {@link LongCount} that describe
 * the same point in time.
 */
import LongCount from "./lc/long-count";
import {CalendarRound} from "./cr/calendar-round";
import {IPart} from "./i-part";
import {CommentWrapper} from "./comment-wrapper";

export default class FullDate extends CommentWrapper implements IPart {

  cr: CalendarRound;
  lc: LongCount;

  /**
   * Create a new full date.
   *
   * @param cr - Calendar Round component.
   * @param lc - Long Count component.
   */
  constructor(cr: CalendarRound, lc: LongCount) {
    super();
    this.cr = cr;
    this.lc = lc;
  }


  /**
   * Render the full date as a string containing both components.
   */
  toString(): string {
    return `${this.cr} ${this.lc}`;
  }

  /**
   * Determine if either component contains wildcards.
   */
  isPartial(): boolean {
    return this.cr.isPartial() || this.lc.isPartial()
  }

  /**
   * Compare two full dates for equality.
   */
  equal(other: IPart): boolean {
    if (other instanceof FullDate) {
      throw new Error('Not Implemented')
    }
    return false;
  }
}
