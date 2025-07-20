import CalendarRoundIterator from './calendar-round-iter';
import {CalendarRound} from "../cr/calendar-round";
import {IPart} from "../i-part";
import {CommentWrapper} from "../comment-wrapper";

/**
 * Reusable singleton instance of {@link CalendarRoundIterator}.
 */
const iter = new CalendarRoundIterator();

/**
 * Expand a Calendar Round containing wildcards into all valid combinations.
 */
export default class CalendarRoundWildcard extends CommentWrapper implements IPart {
  private readonly cr: CalendarRound;

  /**
   * @param cr - Calendar Round to expand.
   */
  constructor(cr: CalendarRound) {
    super();
    this.cr = cr;
  }


  /**
   * Generate all fully qualified Calendar Rounds matching the pattern.
   */
  run() {
    const potentials = [];
    // Iterate through dates and compare
    let cr = iter.next();
    while (!cr.done) {
      if (cr.value !== null) {
        if (this.cr.match(cr.value)) {
          potentials.push(cr.value);
        }
      } else {
        throw new Error("Iteration result is null")
      }
      cr = iter.next();
    }
    iter.reset();
    return potentials;
  }

  equal(other: IPart): boolean {
    if (other instanceof CalendarRoundWildcard) {
      return this.cr.equal(other.cr)
    }
    return false
  }
}
