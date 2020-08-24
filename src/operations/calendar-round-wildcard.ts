import CalendarRoundIterator from './calendar-round-iter';
import {CalendarRound} from "../cr/calendar-round";
import {IPart} from "../i-part";
import {Comment, isComment} from '../comment';

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
export default class CalendarRoundWildcard implements IPart {
  private cr: CalendarRound;
  comment: Comment | undefined;

  /**
   * @param {CalendarRound} cr
   */
  constructor(cr: CalendarRound) {
    /**
     * @type {CalendarRound}
     */
    this.cr = cr;
  }

  setComment(comment: Comment): CalendarRoundWildcard {
    this.comment = comment
    return this;
  }

  appendComment(comment: Comment): CalendarRoundWildcard {
    if (isComment(this.comment)) {
      this.comment = this.comment.merge(comment)
    } else {
      this.setComment(comment)
    }
    return this
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
